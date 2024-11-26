"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from "@/app/firebase/config";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { User } from "@/app/profile/interface";

export default function page() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<User | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getUser = async (id: string) => {
      if (user) {
        await getDoc(doc(db, 'users', user.uid))
          .then((doc) => {
            if (doc.exists()) {
              setUserData(doc.data() as User);
            }
            setFetching(false);
          });
      }
    };
    if (user) {
      getUser(user.uid);
    }
  }, [user]);

  return (
    <div className="text-white p-10 pl-[6vw]">
      <div className="flex items-end space-x-48">
        <div className="flex items-end">
          <img
            src={userData?.pfp}
            alt=""
            className="rounded-full w-[11vw]"
          />
          <div className="px-10">
            <h1 className="uppercase text-4xl font-bold leading-loose">
              {userData?.first + " " + userData?.last}
            </h1>
            <div className="flex space-x-8 text-xl">
              <p>5 followers</p>
              <p>6 following</p>
            </div>
          </div>
        </div>
        {/* <div>
          <p className="text-2xl leading-loose">currently playing:</p>
          <div className="flex items-end space-x-4">
            <img
              src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
              alt=""
              className="w-[6vw] rounded-sm"
            />
            <div>
              <p className="text-2xl font-medium">song name</p>
              <p className="text-xl">artist name</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex items-center py-10">
        <span className="mr-10 text-2xl">Statistics</span>
        <div className="flex-1 h-[1px] bg-white"></div>
      </div>
      <div className="flex justify-between px-36">
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">0</h1>
          <p className="font-semibold text-xl">minutes listened</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">{userData?.playlists[1].songs.length || 0}</h1>
          <p className="font-semibold text-xl">liked songs</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">{(userData?.playlists.length || 2) - 2}</h1>
          <p className="font-semibold text-xl">playlists made</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">0</h1>
          <p className="font-semibold text-xl">songs reviewed</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">Pop</h1>
          <p className="font-semibold text-xl">#1 genre</p>
        </div>
      </div>
      {/* <div className="flex items-center py-10">
        <span className="mr-10 text-2xl">Top</span>
        <div className="flex-1 h-[1px] bg-white"></div>
      </div>
      <div className="flex justify-between px-20">
        <div>
          <p className="font-semibold text-xl">Top songs this month</p>
          <div className="flex space-x-10 p-5">
            <div>
              <img
                src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
                alt=""
                className="w-[11vw] rounded-sm"
              />
              <p className="text-2xl font-medium">song name</p>
              <p className="text-xl">artist name</p>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
                alt=""
                className="w-[11vw] rounded-sm"
              />
              <p className="text-2xl font-medium">song name</p>
              <p className="text-xl">artist name</p>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
                alt=""
                className="w-[11vw] rounded-sm"
              />
              <p className="text-2xl font-medium">song name</p>
              <p className="text-xl">artist name</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-xl">Top artists this month</p>
          <div className="flex space-x-10 p-5">
            <div>
              <img
                src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
                alt=""
                className="w-[11vw] rounded-full"
              />
              <p className="text-2xl font-medium text-center pt-2">
                artist name
              </p>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
                alt=""
                className="w-[11vw] rounded-full"
              />
              <p className="text-2xl font-medium text-center pt-2">
                artist name
              </p>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
                alt=""
                className="w-[11vw] rounded-full"
              />
              <p className="text-2xl font-medium text-center pt-2">
                artist name
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flex items-center py-10">
        <span className="mr-10 text-2xl">Favorites</span>
        <div className="flex-1 h-[1px] bg-white"></div>
      </div>
      <div className="flex px-20">
        <div>
          <p className="font-semibold text-xl">Favorite songs</p>
          <div className="flex space-x-10 p-4">
            {userData?.playlists[1]?.songs && userData.playlists[1].songs.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {userData.playlists[1].songs.slice(0, 3).map((song) => (
                  <div key={song.id} className="flex flex-col items-center">
                    <img
                      src={song.img || '/placeholder-image.png'}
                      alt={song.name}
                      className="w-[11vw] h-[11vw] object-cover rounded-sm mb-2"
                    />
                    <p className="text-lg font-medium text-center truncate max-w-full">
                      {song.name}
                    </p>
                    <p className="text-md text-gray-500 text-center truncate max-w-full">
                      {song.artists}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-xl text-gray-500">No favorited songs!</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="w-[50vw]">
            <p className="font-semibold text-xl">Favorite artists</p>
            {/* <div className="flex space-x-10 p-4">
              <div>
                <img
                  src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
                  alt=""
                  className="w-[11vw] rounded-full"
                />
                <p className="text-2xl font-medium text-center pt-2">
                  artist name
                </p>
              </div>
            </div> */}
            <div className="flex justify-center items-center h-full">
              <p className="text-xl text-gray-500">No favorited artists!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
