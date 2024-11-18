import React from "react";

interface PlaylistProps {
  count: number;
  searchQuery: string;
}

export function Playlist({ count, searchQuery }: PlaylistProps) {
  const playlists = Array.from({ length: count }, (_, idx) => ({
    label: `Playlist ${idx + 1}`,
    href: `#playlist-${idx + 1}`,
    creator: "By Amy Okuma",
    image:
      "https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg",
  }));

  const filteredPlaylists = playlists.filter((playlist) =>
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
