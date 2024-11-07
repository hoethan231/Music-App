import React from 'react';
import uni from "@/public/image.webp";
import Image from 'next/image';
import { DataTable } from "@/components/ui/data-table";
import { columns } from '@/components/ui/columns';

const PlaylistPage: React.FC = () => {

    const tempSongs = [
        {
            title:"fouroclock",
            album:"awesome",
            date:"october",
            length:"1:30"
        },
        {
            title:"cats",
            album:"awesomer",
            date:"november",
            length:"2:30"
        },
        {
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
            <div className="min-h-screen w-2/3 flex justify-center items-center">
                <div className='w-full h-[70%] mr-[6vw] flex'>
                    <DataTable columns={columns} data={tempSongs} />
                </div>
            </div>
        </div>
    );
};

export default PlaylistPage;