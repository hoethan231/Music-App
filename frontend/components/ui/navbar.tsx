"use client";

import React, { useEffect, useState } from 'react';
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
    // const [token2, setToken2] = useState<string | null>(null);
    const [device_id, setDeviceId] = useState<string | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: (cb: (token: string) => void) => { if (token) cb(token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }: { device_id: string }) => {
                setDeviceId(device_id);
                console.log('Ready with Device ID', device_id);
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

            player.connect();

        };

    }, []);

    const playSong = async (e: any, device_id: string | null) => {
        e.preventDefault();
        player.activateElement();
        await player.activateElement();
        fetch('https://api.spotify.com/v1/me/player', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                device_ids: [device_id],
                play: true
            })})
            .then(data => console.log(data))
            .catch(err => console.error(err)
        );
        fetch('https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                device_id: device_id,
                uris: ['spotify:track:6riC3JbelswTdXrOyuREzM']
            })})
            .then(data => console.log(data))
            .catch(err => console.error(err)
        );
    }

    return (
        <nav className="bg-[#171417] text-white p-4 absolute w-screen">
            <div className="container flex items-center mx-auto justify-center">
                <div className="w-1/3 h-full flex justify-center items-center text-xl">
                    <div className="px-14">
                        <a href="#" className="hover:text-gray-400">EXPLORE</a>
                    </div>
                    <div className="px-14">
                        <a href="#" className="hover:text-gray-400">LIBRARY</a>
                    </div>
                </div>
                <div className="w-1/3 h-full flex items-center justify-center">
                    <div className="flex justify-center items-center px-4">
                        <div className="px-3 h-full">
                            <img src={sampleSong.src} alt="sample song" className="rounded-md w-[10vh]"/>
                        </div>
                        <div className='w-[10vw]'>
                            <h1 className="font-sm text-md">morning moon</h1>
                            <h2 className="text-xs text-gray-300">fouroclock</h2>
                        </div>
                    </div>
                    <div className=' flex items-center gap-4'>
                        <IoRepeat className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
                        <IoPlaySkipBack className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
                        <FaPlayCircle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={(e) => playSong(e, device_id)}/>
                        <IoPlaySkipForward className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
                        <IoShuffle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
                    </div>
                    <div className="flex justify-center items-center px-4 invisible">
                        <div className="px-3 h-full">
                            <img src={sampleSong.src} alt="sample song" className="rounded-md w-[10vh]"/>
                        </div>
                        <div className='w-[10vw]'>
                            <h1 className="font-sm text-md">morning moon</h1>
                            <h2 className="text-xs text-gray-300">fouroclock</h2>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 h-full flex items-center justify-center">
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