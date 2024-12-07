import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/app/firebase/config";

interface PlaylistProps {
  playlists: {
    createdAt: string;
    description: string;
    img: string;
    name: string;
    songs: string[];
    uid: string;
  }[];
  searchQuery: string;
}

export function Playlist({ playlists, searchQuery }: PlaylistProps) {
  const [user] = useAuthState(auth);
  const formattedPlaylists = playlists.map((playlist) => ({
    label: playlist.name,
    href: `/library/playlist/${playlist.name.toLowerCase().replace(" ", "-")}`,
    creator: `By ${user?.displayName}`,
    image: playlist.img,
  }));

  const filteredPlaylists = formattedPlaylists.filter((playlist) =>
    playlist.label.toLowerCase().includes((searchQuery || "").toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      {filteredPlaylists.length === 0 ? (
        <div className="text-white">No playlists found</div>
      ) : (
        filteredPlaylists.map((playlist, idx) => (
          <a
            key={idx}
            href={playlist.href}
            className="flex items-center gap-4 p-2 rounded-md hover:bg-[#2c242a] transition-transform duration-300 ease-in-out hover:translate-x-3"
          >
            <img
              src={playlist.image}
              alt={`${playlist.label} cover`}
              className="w-16 h-16 rounded-md"
            />
            <div>
              <h3 className="text-white text-lg font-semibold">
                {playlist.label}
              </h3>
              <p className="text-gray-400 text-sm">{playlist.creator}</p>
            </div>
          </a>
        ))
      )}
    </div>
  );
}
