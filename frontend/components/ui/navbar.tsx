"use client";

import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import sampleSong from "@/public/fouroclock.jpg";
import { FaPlayCircle } from "react-icons/fa";
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

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = async () => {
            const player = await new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb: (token: string) => void) => { if (token) cb(token); },
                volume: 0.5
            });
    
            setPlayer(player);
    
            player.addListener('ready', async ({ device_id }: { device_id: string }) => {
                setDeviceId(device_id);
                console.log('Ready with Device ID', device_id);
            
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
                        const errorData = await response.json();
                        console.error('Spotify API Error:', errorData);
                    } else {
                        console.log('Device activated successfully');
                        setIsInitializing(false);
                    }
                } catch (error) {
                    console.error('Error during player initialization:', error);
                }
            });
    
            player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
                console.log('Device ID has gone offline', device_id);
            });
    
            player.addListener('initialization_error', ({ message }: { message: string }) => {
                console.error(message);
            });
    
            player.addListener('authentication_error', ({ message }: { message: string }) => {
                console.error(message);
            });
    
            player.addListener('account_error', ({ message }: { message: string }) => {
                console.error(message);
            });
    
            await player.connect();
        };
    
        return () => {
            if (player) {
                player.disconnect();
            }
        };
    }, [token]);

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
                <IoPlaySkipBack className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
                <FaPlayCircle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={playSong}/>
                <IoPlaySkipForward className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
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
        <nav className="bg-[#171417] text-white p-4 absolute w-screen">
            <div className="container flex items-center mx-auto justify-center">
                <div className="flex-1 h-full flex justify-center items-center text-xl">
                    <div className="px-14">
                        <a href="#" className="hover:text-gray-400">EXPLORE</a>
                    </div>
                    <div className="px-14">
                        <a href="#" className="hover:text-gray-400">LIBRARY</a>
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
    );
};

export default Navbar;