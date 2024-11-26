"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/ui/data-table";
import { columns } from '@/components/ui/columns';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/config";

interface PlaylistPageProps {
    createdAt: string;
    description: string;
    img: string;
    name: string;
    songs: string[];
    uid: string;
    params: { id: string };
}[]

const ArtistPage: React.FC<PlaylistPageProps> = ({ params }) => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const { id } = params;
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

    const [user, loading, error] = useAuthState(auth);
    const [fetching, setFetching] = useState(true);

    // if (!user) {
    //     router.push("/login");
    // }

    const [album, setAlbum] = useState<{ img: string, name: string, description: string, background: string }>({ img: "", name: "", description: "", background: "" });
    const [tracks, setTracks] = useState<any[]>([]);

    function formatDuration(milliseconds: string) {
        const totalSeconds = Math.floor(Number(milliseconds) / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    function formatDate(date: Date) {

        const dateObj = date instanceof Date ? date : new Date(date);

        if (isNaN(dateObj.getTime())) {
            return 'Invalid Date';
        }

        return dateObj.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
    }

    const fetchSpotify = async () => {
        fetch(`https://api.spotify.com/v1/artists/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const album = {
                    img: data.images[0].url,
                    name: data.name,
                    description: data.genres.join(", "),
                    background: "-1",
                }
                setAlbum(album);
            })
            .catch((err) => console.error(err));
        fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const formattedTracks = data.tracks
                    .map((item: any, index: number) => ({
                        idx: index + 1,
                        id: item.id,
                        title: item.name,
                        artist: item.artists[0].name,
                        album: item.album.name,
                        img: item.album.images[1].url,
                        date: formatDate(item.album.release_date),
                        length: formatDuration(item.duration_ms),
                    }));
                setTracks(formattedTracks);
            })
            .catch((err) => console.error(err));
        setFetching(false);

    };

    useEffect(() => {
        if (!loading && user) {
            fetchSpotify();
        }
    }, [user, loading, error]);

    return (
        <div className='flex min-h-screen min-w-screen bg-gradient-to-b from-[#180F18] to-[#1D1D20]'>
            <div className="min-h-screen w-1/3 flex justify-center items-center">
                <div className="text-white w-[80%] flex justify-center items-center flex-col">
                    {!album || album.img === "" ? (
                        <>
                            <Skeleton className='w-[20vw] h-[20vw] rounded-[10%]' />
                            <Skeleton className='w-[16vw] h-[2.5vw] my-[3vh]' />
                            <Skeleton className='w-[14vw] h-[2vh]' />
                        </>
                    ) : (
                        album.background !== "-1" ? (
                            <>
                                <Card style={{ background: album.background }}>
                                    <CardContent className="flex w-[20vw] h-[20vw] rounded-[10%] items-center justify-center p-6 bg-[#747474] bg-opacity-20 text-center">
                                        <span className="text-[4vw] text-[#0E0317] font-semibold">
                                            {album.name}
                                        </span>
                                    </CardContent>
                                </Card>
                                <div className="px-[2vw]">
                                    <h1 className='p-3 text-[1.5vw] text-center'>{album.description}</h1>
                                </div>
                            </>
                        ) : (
                            <>
                                <img src={album.img} alt={album.name} className='w-[20vw] h-[20vw] rounded-[10%]' />
                                <h1 className='pb-6 text-[2.5vw] font-bold'>{album.name}</h1>
                                <h2 className='text-[1vw]'>{album.description}</h2>
                            </>
                        )
                    )}
                </div>
            </div>
            <div className="max-h-screen w-2/3 flex justify-center items-center">
                <DataTable columns={columns} data={tracks} fetching={fetching} />
            </div>
        </div>
    );
};

export default ArtistPage;