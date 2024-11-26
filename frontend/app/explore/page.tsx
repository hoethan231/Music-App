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
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Track, Album, Artist, Playlist } from "@/app/explore/interface";
import { usePlayer } from '@/lib/PlayerContext';

export default function page() {
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { playSong } = usePlayer();
  const defaultPFP = "https://firebasestorage.googleapis.com/v0/b/music-app-db471.firebasestorage.app/o/default-pfp.png?alt=media&token=647a3cc7-1c60-465f-921e-0b0793cbdb95"
  const gradients = [
    "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    "linear-gradient(to right, #d4fc79, #96e6a1)",
    "linear-gradient(to right, #fbc2eb, #a6c1ee)",
    "linear-gradient(to right, #ffecd2, #fcb69f)",
    "linear-gradient(to right, #ff9a9e, #fecfef)",
    "linear-gradient(to right, #f6d365, #fda085)",
    "linear-gradient(to right, #fbc2eb, #a18cd1)",
    "linear-gradient(to right, #ffdde1, #ee9ca7)",
  ];

  const [searchQuery, setSearchQuery] = useState("");

  //Searching for Songs and Albums
  const [open, setOpen] = useState(false);
  const [songs, setSongs] = useState<{ songs: Track }[]>([]);
  const [albums, setAlbums] = useState<{ albums: Album }[]>([]);
  const [artists, setArtists] = useState<{ artists: Artist }[]>([]);
  const [loading2, setLoading2] = useState(true);

  //Exploring Playlists and Artists
  const [playlists, setPlaylists] = useState<{ playlists: Playlist }[]>([]);
  const [artistsCarousel, setArtistsCarousel] = useState<
    { artistsCarousel: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // if (!user) {
  //   router.push("/login");
  // }

  useEffect(() => {
    const fetchPlaylists = fetch(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data.playlists.items);
      })
      .catch((err) => {
        console.log(err);
      });

    const fetchArtists = fetch(
      "https://api.spotify.com/v1/recommendations?seed_artists=35l9BRT7MXmM8bv2WDQiyB",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setArtistsCarousel(data.tracks);
      });

    Promise.all([fetchPlaylists, fetchArtists]).finally(() =>
      setLoading(false)
    );
  }, []);

  const handleRowClick = async (songID: string) => {
    playSong(`spotify:track:${songID}`);
  };

  const fetchSearch = async (query: string) => {
    await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=album%2Cartist%2Ctrack&limit=20`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSongs(data.tracks.items);
        setArtists(data.artists.items);
        setAlbums(data.albums.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSearch(searchQuery);
    setOpen(true);
  };

  return (
    <div className="pl-[2vw]">
      <div className="relative px-4 mt-10 mx-16">
        <h1 className="text-8xl font-bold text-white pb-10">
          Hey {!loading && (user?.displayName?.split(" ")[0]+"!" || "there!")}
        </h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="What do you want to play?"
            value={searchQuery}
            onChange={handleSearch}
            className="bg-[#2E252E] text-[#BFBFBF] rounded-md w-full pl-10 pr-4 py-4 focus:outline-none"
          />
        </form>
        {open && (
          <div className="mt-6 rounded-md py-10 text-white w-full">
            <div className="flex">
              <div className="mr-6 w-[50%] bg-[#2E252E] p-4 rounded-md">
                <h1 className="font-bold text-3xl text-left">Songs</h1>
                <div className="bg-white h-[1px] w-full my-2"></div>
                <div className="overflow-y-auto max-h-[calc(5*3.25vw)]">
                  <div className="space-y-1">
                    {songs.map((song) => (
                      <div
                      onClick={() => handleRowClick(song.id)} 
                      className="flex items-center gap-4 hover:bg-[#413441] transition-transform duration-300 ease-in-out hover:translate-x-3 px-3 py-1 rounded-md">
                        <img
                          src={song.album.images[0].url || defaultPFP}
                          alt=""
                          className="w-[3.5vw] rounded-sm"
                        />
                        <div>
                          <p className="text-xl font-medium">{song.name}</p>
                          <p className="text-lg text-gray-300">
                            {song.artists[0].name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-[50%] bg-[#2E252E] p-4 rounded-md">
                <h1 className="font-bold text-3xl text-left">Albums</h1>
                <div className="bg-white h-[1px] w-full my-2"></div>
                <div className="overflow-y-auto max-h-[calc(5*3.25vw)]">
                  <div className="space-y-1">
                    {albums.map((album) => (
                      <div className="flex items-center gap-4 hover:bg-[#413441] transition-transform duration-300 ease-in-out hover:translate-x-3 px-3 py-1 rounded-md">
                        <img
                          src={album.images[0].url || defaultPFP}
                          alt=""
                          className="w-[3.5vw] rounded-sm"
                        />
                        <div>
                          <p className="text-xl font-medium">{album.name}</p>
                          <p className="text-lg text-gray-300">
                            {album.artists[0].name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 bg-[#2E252E] p-4 rounded-md">
              <h1 className="font-bold text-3xl">Artists</h1>
              <div className="bg-white h-[1px] w-full my-2"></div>
              <div className="flex justify-between space-x-10 px-10">
                {artists.slice(0, 7).map((artist) => (
                  <div 
                  key={artist.id}
                  onClick={() => router.push(`/artist/${artist.id}`)}
                  className="mt-2 hover:bg-[#413441] px-3 py-2 rounded-md w-[10vw]">
                    <img
                      src={artist.images[0]?.url || defaultPFP}
                      alt=""
                      className="rounded-full mx-auto w-[8vw] h-[8vw]"
                    />
                    <div className="text-center">
                      <p className="text-2xl font-medium pt-2">{artist.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-20 pt-10 pb-6">
        <h1 className="text-4xl font-bold text-white">Listen Now</h1>
        <p className="text-white text-opacity-75">Top picks for you.</p>
      </div>
      <div className="bg-white h-[1px] bg-opacity-30 w-[92%] mx-auto" />
      <div className="flex justify-center items-center">
        <Carousel className="w-full text-white px-20 py-10">
          <CarouselContent>
            {!loading
              ? artistsCarousel.map((artist, index) => (
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
              ))
              : Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Skeleton className="flex h-[30vw] w-[21.5vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20" />
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
        <Carousel className="max-w-screen text-white px-16 py-10">
          <CarouselContent>
            {!loading
              ? playlists.map((playlist, index) => {
                const randomGradient =
                  gradients[Math.floor(Math.random() * gradients.length)];
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
                );
              })
              : Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Skeleton className="flex w-[17vw] h-[17vw] items-center justify-center p-6 bg-[#747474] bg-opacity-20" />
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