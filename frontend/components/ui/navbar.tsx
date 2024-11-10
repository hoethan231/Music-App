import React from 'react';
import sampleSong from "@/public/fouroclock.jpg";
import { FaPlayCircle } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoShuffle, IoRepeat } from "react-icons/io5";


const Navbar: React.FC = () => {
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
                        <FaPlayCircle className="h-8 w-8 hover:text-gray-400 hover:cursor-pointer"/>
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