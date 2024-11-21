"use client";
import React, { useState, useEffect } from 'react';
import uni from "@/public/image.webp";
import Image from 'next/image';
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/ui/data-table";
import { columns } from '@/components/ui/columns';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

interface PlaylistPageProps {
    params: { id: string };
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ params }) => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const { id } = params;
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    
    if (!user) {
        router.push("/login");
    }
        
    const [album, setAlbum] = useState<{ img: string }>({ img: "" });
    const [tracks, setTracks] = useState<any[]>([]);

    const fetchSpotify = async () => {
        fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const formattedTracks = data.tracks.items
                .filter((item: any) => item.track.type === "track")
                .map((item: any, index: number) => ({
                    idx: index + 1,
                    id: item.track.id,
                    title: item.track.name,
                    artist: item.track.artists[0].name,
                    album: item.track.album.name,
                    img: item.track.album.images[1].url,
                    date: item.added_at.substring(0,10),
                    length: new Date(item.track.duration_ms).toISOString(),
                }));
                setTracks(formattedTracks);
            });
    };

    const fetchLikedTracks = async () => {
        if (user?.uid) {
            await getDoc(doc(db, 'users', user.uid))
                .then((doc) => {
                    if (doc.exists()) {
                        setAlbum(doc.data().playlists[1]);
                        setTracks(doc.data().playlists[1].songs);
                    }
                });
        }
    };

    useEffect(() => {
        if (!loading && user) {
            if (id === 'liked-songs') {
                fetchLikedTracks();
            }
            else {
                fetchSpotify();
            }
        }
    }, [user, loading, error]);

    return (
        <div className='flex min-h-screen min-w-screen bg-gradient-to-b from-[#180F18] to-[#1D1D20]'>
            <div className="min-h-screen w-1/3 flex justify-center items-center">
                <div className="text-white w-[80%] flex justify-center items-center flex-col">
                    {!album || album.img === "" ? (
                        <Skeleton className='w-[20vw] h-[20vw] rounded-[10%]' />
                    ) : (
                        <img src={album.img} alt="" className='rounded-[10%]'/>
                    )}
                    {!album ? (
                        <>
                            <Skeleton className='w-[16vw] h-[2.5vw] my-[3vh]' />
                            <Skeleton className='w-[14vw] h-[2vh]' />
                        </>
                    ) : (
                        <>
                            <h1 className='p-3 text-[2.5vw] font-bold'>Meow Playlist!!</h1>
                            <h2 className='text-[1vw]'>Gymming music!!</h2>
                        </>
                    )}
                </div>
            </div>
            <div className="max-h-screen w-2/3 flex justify-center items-center">
                <DataTable columns={columns} data={tracks} />
            </div>
        </div>
    );
};

export default PlaylistPage;