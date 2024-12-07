"use client";

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import sampleSong from "@/public/fouroclock.jpg";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoShuffle, IoRepeat } from "react-icons/io5";
import Link from 'next/link';
import { usePlayer } from "@/lib/PlayerContext";

const Navbar: React.FC = () => {

    const { isInitializing, isPlaying, currentTrack, resumeSong, pauseSong, skipSong, previousSong, setVolume } = usePlayer();

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
            <div className="flex justify-center items-center px-3">
                <div className="px-3 h-full">
                    {currentTrack && <img src={currentTrack?.album.images[2]?.url} alt="sample song" className="rounded-md w-[10vh]"/>}
                </div>
                <div className="w-[10vw]">
                    {currentTrack && <h1 className="font-sm text-md">{(currentTrack?.name)}</h1>}
                    {currentTrack && <h2 className="text-xs text-gray-300">{currentTrack?.artists.map((artist, idx) => (
                        artist.name + (idx === currentTrack.artists.length - 1 ? "" : ", ")
                    ))}</h2>}
                </div>
            </div>
            <div className="flex items-center gap-4">
                <IoRepeat className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
                <IoPlaySkipBack className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={previousSong}/>
                {isPlaying ? (
                    <FaPauseCircle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={pauseSong}/>
                    ) : (
                    <FaPlayCircle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={resumeSong}/>)}
                <IoPlaySkipForward className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer" onClick={skipSong}/>
                <IoShuffle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
            </div>
            <div className="flex justify-center items-center pl-10">
                <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="w-[6vw] h-1/2"
                    onValueChange={(value: number[]) => {
                        setVolume(value[0] / 100);
                    }}
                />
            </div>
        </>
    );

    return (
        <>
            <nav className="bg-[#171417] z-50 text-white p-4 w-screen fixed top-0 left-0">
                <div className="container flex items-center mx-auto justify-center">
                    <div className="flex-1 h-full flex justify-center items-center text-xl">
                        <div className="px-14">
                            <Link href="/explore">
                                <h1 className="hover:text-gray-400">EXPLORE</h1>
                            </Link>
                        </div>
                        <div className="px-14">
                            <Link href="/library/playlists">
                                <h1  className="hover:text-gray-400">LIBRARY</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center">
                        {isInitializing ? <LoadingState /> : <LoadedState />}
                    </div>
                    <div className="flex-1 h-full flex items-center justify-center text-xl">
                        <div className="pr-7">
                            <Link href="/community">
                                <h1 className="hover:text-gray-400">COMMUNITY</h1>
                            </Link>
                        </div>
                        <div className="px-14">
                            <Link href="/profile">
                                <h1 className="hover:text-gray-400">PROFILE</h1>
                            </Link>
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