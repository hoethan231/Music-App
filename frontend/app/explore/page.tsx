import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-two";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <div>
      <div className="px-20 pt-10 pb-6">
        <h1 className="text-4xl font-bold text-white">Listen Now</h1>
        <p className="text-white text-opacity-75">Top picks for you.</p>
      </div>
      <div className="bg-white h-[1px] bg-opacity-30 w-[92%] mx-auto" />
      <div className="flex justify-center items-center">
        <Carousel className="w-full text-white px-20 py-10">
          <CarouselContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex h-[30vw] w-[21.5vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20">
                      <span className="text-4xl text-[#c2a2e9] font-semibold">
                        artist goes here
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end mt-4 mr-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
      <div className="px-20 pt-10 pb-6">
        <h1 className="text-4xl font-bold text-white">Made for you</h1>
        <p className="text-white text-opacity-75">
          Your personalized playlists.
        </p>
      </div>
      <div className="bg-white h-[1px] bg-opacity-30 w-[92%] mx-auto" />
      <div className="flex justify-center items-center">
        <Carousel className="w-full text-white px-20 py-10 ">
          <CarouselContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex w-[17vw] h-[17vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20">
                      <span className="text-4xl text-[#c2a2e9] font-semibold">
                        playlist goes here
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end mt-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
