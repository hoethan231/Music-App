"use client";
import React, { useState, useEffect } from 'react';
import uni from "@/public/image.webp";
import Image from 'next/image';
import { DataTable } from "@/components/ui/data-table";
import { columns } from '@/components/ui/columns';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/config";
import { useRouter, useSearchParams } from 'next/navigation';

interface PlaylistPageProps {
    params: { id: string };
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ params }) => {
    const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
    const { id } = params;
    const router = useRouter();
    const searchParams = useSearchParams()
    const [user] = useAuthState(auth);
    const userSession = sessionStorage.getItem("user");
    
    if (!user && !userSession) {
        router.push("/login");
    }

    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            console.log(id);
            fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const formattedTracks = data.tracks.items.map((item: any, index: number) => ({
                        idx: index + 1,
                        title: item.track.name,
                        album: item.track.album.name,
                        date: item.added_at.substring(0,10),
                        length: new Date(item.track.duration_ms).toISOString().substr(11, 8), // Convert ms to HH:MM:SS
                    }));
                    setTracks(formattedTracks);
                });
        };
        fetchData();
    }, []);

    const tempSongs = [
        {
            idx:"1",
            title:"fouroclock",
            album:"awesome",
            date:"october",
            length:"1:30"
        },
        {
            idx:"2",
            title:"cats",
            album:"awesomer",
            date:"november",
            length:"2:30"
        },
        {
            idx:"3",
            title:"trees",
            album:"disaster",
            date:"frebuaray",
            length:"1:33"
        },
    ];

    return (
        <div className='flex min-h-screen min-w-screen bg-gradient-to-b from-[#180F18] to-[#1D1D20]'>
            <div className="min-h-screen w-1/3 flex justify-center items-center">
                <div className="text-white w-[80%] flex justify-center items-center flex-col">
                    <Image src={uni} alt="" className='rounded-[10%]' />
                    <h1 className='p-3 text-[2.5vw] font-bold'>Meow Playlist!!</h1>
                    <h2 className='text-[1vw]'>Gymming music!!</h2>
                </div>
            </div>
            <div className="max-h-screen w-2/3 flex justify-center items-center">
                <DataTable columns={columns} data={tracks} />
            </div>
        </div>
    );
};

export default PlaylistPage;