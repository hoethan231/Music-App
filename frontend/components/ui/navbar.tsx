"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import sampleSong from "@/public/fouroclock.jpg";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoShuffle, IoRepeat } from "react-icons/io5";

declare global {
    interface Window {
      onSpotifyWebPlaybackSDKReady: () => void;
      Player: (options: any) => any;
      Spotify: any;
    }
}

const Navbar: React.FC = () => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const [player, setPlayer] = useState<Window['Spotify']['Player'] | null>(null);
    const [device_id, setDeviceId] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [initializationAttempts, setInitializationAttempts] = useState(0);
    const MAX_RETRY_ATTEMPTS = 3;

    const initializePlayer = useCallback(async () => {
        if (!token) {
            console.error('Access token not available');
            return;
        }

        try {
            const existingScript = document.getElementById('spotify-player');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }

            const script = document.createElement("script");
            script.id = 'spotify-player';
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            const scriptLoadPromise = new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
            });

            document.body.appendChild(script);
            await scriptLoadPromise;

            await new Promise<void>((resolve) => {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    resolve();
                };
                setTimeout(() => resolve(), 5000);
            });

            const initPlayer = async () => {
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: (cb: (token: string) => void) => {
                        if (token) {
                            console.log('Providing token to SDK...');
                            cb(token);
                        }
                    },
                    volume: 0.5
                });

                player.addListener('ready', async ({ device_id }: { device_id: string }) => {
                    console.log('Player ready with device ID', device_id);
                    setDeviceId(device_id);
                    
                    try {
                        await player.connect();
                        await player.activateElement();
                        
                        const response = await fetch('https://api.spotify.com/v1/me/player', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                device_ids: [device_id],
                                play: false
                            })
                        });
                        
                        if (!response.ok) {
                            throw new Error(`Device activation failed: ${response.status}`);
                        }
                        
                        console.log('Device activated successfully');
                        setIsInitializing(false);
                    } catch (error) {
                        console.error('Error during device activation:', error);
                        throw error;
                    }
                });

                player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('initialization_error', ({ message }: { message: string }) => {
                    console.error('Initialization error:', message);
                });

                player.addListener('authentication_error', ({ message }: { message: string }) => {
                    console.error('Authentication error:', message);
                });

                player.addListener('account_error', ({ message }: { message: string }) => {
                    console.error('Account error:', message);
                });

                const connected = await player.connect();
                if (!connected) {
                    console.error('Failed to connect player');
                }

                return player;
            };

            let attemptCount = 0;
            let lastError: Error | null = null;

            while (attemptCount < MAX_RETRY_ATTEMPTS) {
                try {
                    const newPlayer = await initPlayer();
                    setPlayer(newPlayer);
                    setInitializationAttempts(attemptCount + 1);
                    return;
                } catch (error) {
                    lastError = error as Error;
                    console.error(`Attempt ${attemptCount + 1} failed:`, error);
                    attemptCount++;
                    // Wait before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }

            if (lastError) {
                throw lastError;
            }

        } catch (error) {
            console.error('Final initialization error:', error);
            setIsInitializing(false);
        }
    }, [token]);

    useEffect(() => {
        if (token && !player && initializationAttempts < MAX_RETRY_ATTEMPTS) {
            initializePlayer();
        }
    }, [token, player, initializationAttempts, initializePlayer]);

    useEffect(() => {
        if (player) {
            const interval = setInterval(async () => {
                try {
                    const state = await player.getCurrentState();
                    if (!state) {
                        console.log('No player state, attempting reconnect...');
                        await player.connect();
                    }
                } catch (error) {
                    console.error('Error checking player state:', error);
                }
            }, 5000);

            return () => {
                clearInterval(interval);
                player.disconnect();
            };
        }
    }, [player]);

    useEffect(() => {
        if (player) {
            player.addListener('player_state_changed', (state: { paused: any; }) => {
                if (state) {
                    setIsPlaying(!state.paused);
                }
            });

            const interval = setInterval(async () => {
                const state = await player.getCurrentState();
                if (!state) {
                    try {
                        await player.connect();
                        await player.activateElement();
                    } catch (error) {
                        console.error('Failed to reconnect player:', error);
                    }
                }
            }, 5000);

            return () => {
                clearInterval(interval);
                player.removeListener('player_state_changed');
            };
        }
    }, [player]);

    const playSong = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!player || !device_id) {
            console.error('Player or device_id not initialized');
            return;
        }
        
        try {
            await fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    device_ids: [device_id],
                    play: false
                })
            });
    
            const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    uris: ['spotify:track:7tzIfhMZhShxk8yqsYQBY8']
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Spotify API Error:', errorData);
                
                if (response.status === 404) {
                    console.log('Attempting to reconnect player...');
                    await player.connect();
                    await player.activateElement();
                    const retryResponse = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            uris: ['spotify:track:7tzIfhMZhShxk8yqsYQBY8']
                        })
                    });
                    
                    if (!retryResponse.ok) {
                        const retryErrorData = await retryResponse.json();
                        console.error('Retry failed:', retryErrorData);
                    }
                }
            } else {
                console.log('Playback started successfully');
            }
        } catch (error) {
            console.error('Error during playback:', error);
        }
    };

    const pauseSong = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!player || !device_id) {
            console.error('Player or device_id not initialized');
            return;
        }
        
        try {
            const state = await player.getCurrentState();
            if (!state) {
                console.error('Player state could not be fetched');
                return;
            }

            await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setIsPlaying(false);
            console.log('Paused!');
        } catch (error) {
            console.error('Error during pause:', error);
            try {
                await player.connect();
                await player.activateElement();
            } catch (reconnectError) {
                console.error('Failed to reconnect player:', reconnectError);
            }
        }
    };

    const skipSong = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!player || !device_id) {
            console.error('Player or device_id not initialized');
            return;
        }
        
        try {
            const state = await player.getCurrentState();
            if (!state) {
                console.error('Player state could not be fetched');
                return;
            }

            await fetch(`https://api.spotify.com/v1/me/player/next?device_id=${device_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('Skipped!');
            setTimeout(() => {
                player.getCurrentState().then((state: { paused: boolean; }) => {
                    setIsPlaying(state?.paused === false);
                });
            }, 200);
        } catch (error) {
            console.error('Error during skip:', error);
            try {
                await player.connect();
                await player.activateElement();
            } catch (reconnectError) {
                console.error('Failed to reconnect player:', reconnectError);
            }
        }
    };

    const previousSong = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!player || !device_id) {
            console.error('Player or device_id not initialized');
            return;
        }
        
        try {
            const state = await player.getCurrentState();
            if (!state) {
                console.error('Player state could not be fetched');
                return;
            }

            await fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${device_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('Previous track!');
            setTimeout(() => {
                player.getCurrentState().then((state: { paused: boolean; }) => {
                    setIsPlaying(state?.paused === false);
                });
            }, 200);
        } catch (error) {
            console.error('Error during previous track:', error);
            try {
                await player.connect();
                await player.activateElement();
            } catch (reconnectError) {
                console.error('Failed to reconnect player:', reconnectError);
            }
        }
    };

    const LoadingState = () => (
        <>
            <div className="flex justify-center items-center px-4">
                <div className="px-3">
                    <Skeleton className="h-[3vw] w-[3vw] rounded-md" />
                </div>
                <div className="w-[10vw] space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex justify-center items-center px-4 invisible">
                <div className="px-3 h-full">
                    <img src={sampleSong.src} alt="sample song" className="rounded-md w-[10vh]"/>
                </div>
                <div className="w-[10vw]">
                    <h1 className="font-sm text-md">morning moon</h1>
                    <h2 className="text-xs text-gray-300">fouroclock</h2>
                </div>
            </div>
        </>
    );

    const LoadedState = () => (
        <>
            <div className="flex justify-center items-center px-4">
                <div className="px-3 h-full">
                    <img src={sampleSong.src} alt="sample song" className="rounded-md w-[10vh]"/>
                </div>
                <div className="w-[10vw]">
                    <h1 className="font-sm text-md">morning moon</h1>
                    <h2 className="text-xs text-gray-300">fouroclock</h2>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <IoRepeat className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
                <IoPlaySkipBack className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={previousSong}/>
                {isPlaying ? (
                    <FaPauseCircle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={pauseSong}/>
                    ) : (
                    <FaPlayCircle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={playSong}/>)}
                <IoPlaySkipForward className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={skipSong}/>
                <IoShuffle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
            </div>
            <div className="flex justify-center items-center px-4 invisible">
                <div className="px-3 h-full">
                    <img src={sampleSong.src} alt="sample song" className="rounded-md w-[10vh]"/>
                </div>
                <div className="w-[10vw]">
                    <h1 className="font-sm text-md">morning moon</h1>
                    <h2 className="text-xs text-gray-300">fouroclock</h2>
                </div>
            </div>
        </>
    );

    return (
        <>
            <nav className="bg-[#171417] z-50 text-white p-4 w-screen fixed top-0 left-0">
                <div className="container flex items-center mx-auto justify-center">
                    <div className="flex-1 h-full flex justify-center items-center text-xl">
                        <div className="px-14">
                            <a href="/explore" className="hover:text-gray-400">EXPLORE</a>
                        </div>
                        <div className="px-14">
                            <a href="/library/playlists" className="hover:text-gray-400">LIBRARY</a>
                        </div>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center">
                        {isInitializing ? <LoadingState /> : <LoadedState />}
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center text-xl">
                        <div className="px-14">
                            <a href="#" className="hover:text-gray-400">COMMUNITY</a>
                        </div>
                        <div className="px-14">
                            <a href="/profile" className="hover:text-gray-400">PROFILE</a>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="bg-[#171417] text-white p-4 w-screen invisible">
                <div className="container flex items-center mx-auto justify-center">
                    <div className="flex-1 h-full flex justify-center items-center text-xl">
                        <div className="px-14">
                            <a href="/explore" className="hover:text-gray-400">EXPLORE</a>
                        </div>
                        <div className="px-14">
                            <a href="/library/playlist" className="hover:text-gray-400">LIBRARY</a>
                        </div>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center">
                        {isInitializing ? <LoadingState /> : <LoadedState />}
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center">
                        <div className="px-14">
                            <a href="#" className="hover:text-gray-400">COMMUNITY</a>
                        </div>
                        <div className="px-14">
                            <a href="#" className="hover:text-gray-400">PROFILE</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;