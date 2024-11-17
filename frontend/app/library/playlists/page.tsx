"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem
  } from "@/components/ui/carousel"
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/config";
import { useRouter } from 'next/navigation';

const PlaylistsPage: React.FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const userSession = sessionStorage.getItem("user");
    
    const [currentCard, setCurrentCard] = useState<number>(0);

    if (!userSession && !user) {
        router.push("/login");
    }

    const setIndex = (e: number) => {
        setCurrentCard(e+2);
    }

    return (
        <div className='bg-gradient-to-t from-[#1D1E21] to-[#180E18] h-[100vh]'>
            <div className="p-40">
                <h1 className='text-white text-4xl pb-4 font-bold'>Your Playlists</h1>
                <div className="flex">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full max-w-sm"
                        currentIndex={(index) => {setIndex(index); return index;}}
                        >
                        <CarouselContent>
                            {Array.from({ length: 20 }).map((_, index) => (
                                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                                    <motion.div 
                                        animate={{
                                            height: currentCard === index ? "100%" : "80%",
                                            width: currentCard === index ? "100%" : "80%",
                                            transition: { duration: 0.15 },
                                        }}
                                        >
                                        <Link
                                            href={"google.com"}
                                            key={index}
                                            className="relative group block p-2"
                                        >
                                            <AnimatePresence>
                                                {currentCard === index && (
                                                    <motion.span
                                                        className="absolute inset-0 h-full w-full bg-transparent block rounded-3xl border-4"
                                                        layoutId="hoverBackground"
                                                        initial={{ opacity: 0 }}
                                                        animate={{
                                                        opacity: 1,
                                                        transition: { duration: 0.05 },
                                                        }}
                                                        exit={{
                                                        opacity: 0,
                                                        transition: { duration: 0.05 },
                                                        }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                                {index > 1 && index < 18 && <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-3xl text-white font-semibold">{index - 1}</span>
                                                    </CardContent>
                                                </Card>}
                                        </Link>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default PlaylistsPage;