"use client";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem
  } from "@/components/ui/carousel"

const PlaylistsPage: React.FC = () => {
    
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
                        >
                        <CarouselContent>
                            {Array.from({ length: 20 }).map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                                <div className="p-1">
                                    {index > 1 && index < 18 && <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-3xl text-white font-semibold">{index - 1}</span>
                                        </CardContent>
                                    </Card>}
                                </div>
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