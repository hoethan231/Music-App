"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel-two";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/config";

export default function page() {
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");
  const gradients = [
    "linear-gradient(to right, #a8edea, #fed6e3)",
    "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    "linear-gradient(to right, #fddb92, #d1fdff)",
    "linear-gradient(to right, #d4fc79, #96e6a1)",
    "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    "linear-gradient(to right, #ffecd2, #fcb69f)",
    "linear-gradient(to right, #ff9a9e, #fecfef)",
    "linear-gradient(to right, #f6d365, #fda085)",
    "linear-gradient(to right, #fbc2eb, #a18cd1)",
    "linear-gradient(to right, #ffdde1, #ee9ca7)",
    "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    "linear-gradient(to right, #d4fc79, #96e6a1)",
    "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    "linear-gradient(to right, #ffecd2, #fcb69f)",
    "linear-gradient(to right, #fddb92, #d1fdff)",
    "linear-gradient(to right, #a8edea, #fed6e3)",
    "linear-gradient(to right, #ff9a9e, #fecfef)",
    "linear-gradient(to right, #f6d365, #fda085)",
    "linear-gradient(to right, #fbc2eb, #a18cd1)",
    "linear-gradient(to right, #ffdde1, #ee9ca7)"
  ];

  const [playlists, setPlaylists] = useState<{
    id: any; name: string 
}[]>([]);
  const [artists, setArtists] = useState<{ artists: string }[]>([]);
  const [loading, setLoading] = useState(true);

  if (!user && !userSession) {
    router.push("/login");
  }

  useEffect(() => {
    const fetchPlaylists = fetch("https://api.spotify.com/v1/browse/featured-playlists", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
      })
      .catch((err) => {
        console.log(err);
      });

    const fetchArtists = fetch("https://api.spotify.com/v1/recommendations?seed_artists=35l9BRT7MXmM8bv2WDQiyB", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setArtists(data.tracks);
      });

    Promise.all([fetchPlaylists, fetchArtists]).finally(() => setLoading(false));
  }, []);

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
            {!loading ? (artists.map((artist, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex h-[30vw] w-[21.5vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20">
                      <span className="text-4xl text-[#c2a2e9] font-semibold">
                        {artist.artists[0].name}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))) : (
                Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Skeleton className="flex h-[30vw] w-[21.5vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20" />
                    </div>
                  </CarouselItem>
                ))
            )}
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
            {!loading ? (
              playlists.map((playlist, index) => {
                const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
                return (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Link href={`/library/playlist/${playlist.id}`}>
                        <Card style={{ background: randomGradient }}>
                          <CardContent className="flex w-[17vw] h-[17vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20 text-center">
                            <span className="text-4xl text-[#0E0317] font-semibold">
                              {playlist.name}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                )
              })
            ) : (
              Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Skeleton className="flex w-[17vw] h-[17vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20" />
                  </div>
                </CarouselItem>
              ))
            )}
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
