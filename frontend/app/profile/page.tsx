import React from "react";

export default function page() {
  return (
    <div className="text-white p-10 pl-[6vw]">
      <div className="flex items-end space-x-48">
        <div className="flex items-end">
          <img
            src="https://i.pinimg.com/736x/13/4d/af/134dafea7229dffcf5a8710a9bd7c897.jpg"
            alt=""
            className="rounded-full w-[11vw]"
          />
          <div className="px-10">
            <h1 className="uppercase text-4xl font-bold leading-loose">
              username
            </h1>
            <div className="flex space-x-8 text-xl">
              <p>0 followers</p>
              <p>0 following</p>
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </div>
      <div className="flex items-center py-10">
        <span className="mr-10 text-2xl">Statistics</span>
        <div className="flex-1 h-[1px] bg-white"></div>
      </div>
      <div className="flex justify-between px-36">
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">10,000</h1>
          <p className="font-semibold text-xl">minutes listened</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">2,000</h1>
          <p className="font-semibold text-xl">liked songs</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">100</h1>
          <p className="font-semibold text-xl">playlists made</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">0</h1>
          <p className="font-semibold text-xl">songs reviewed</p>
        </div>
        <div className="text-center">
          <h1 className="text-[3.3vw] font-bold">K-Pop</h1>
          <p className="font-semibold text-xl">#1 genre</p>
        </div>
      </div>
      <div className="flex items-center py-10">
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
      </div>
      <div className="flex items-center py-10">
        <span className="mr-10 text-2xl">Favorites</span>
        <div className="flex-1 h-[1px] bg-white"></div>
      </div>
      <div className="flex justify-between px-20">
        <div>
          <p className="font-semibold text-xl">Favorite songs</p>
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
          <p className="font-semibold text-xl">Favorite artists</p>
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
      </div>
    </div>
  );
}
