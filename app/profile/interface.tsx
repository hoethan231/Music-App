import { Playlist } from "@/app/explore/interface";

export interface User {
    createdAt: string;
    email: string;
    first: string;
    last: string;
    pfp: string;
    playlists: Playlist[];
    uid: string;
}