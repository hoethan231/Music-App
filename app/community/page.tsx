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
import { IconSearch } from "@tabler/icons-react";

export default function page() {
  const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const router = useRouter();
  const [user] = useAuthState(auth);
  const gradients = [
    "linear-gradient(to right, #a1c4fd, #c2e9fb)",
    "linear-gradient(to right, #a2c2e9, #b3e0f0)",
    "linear-gradient(to right, #b3d9ff, #e0f7fa)",
    "linear-gradient(to right, #c7e4fd, #e6f8ff)",
    "linear-gradient(to right, #a7c7e7, #d2e9f8)"

  ];

  const backgroundColors = [
    "linear-gradient(to left, #777777, #feb47b)",
    "linear-gradient(to right, #111222, #00f2fe)",
    "linear-gradient(to right, #111111, #764ba2)",
    "linear-gradient(to right, #000111, #185a9d)",
    "linear-gradient(to right, #000000, #fda085)",

  ];
  

  const [playlists, setPlaylists] = useState<
    {
      id: any;
      name: string;
    }[]
  >([]);
  const [artists, setArtists] = useState<{ artists: string }[]>([]);
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
        setArtists(data.tracks);
      });

    Promise.all([fetchPlaylists, fetchArtists]).finally(() =>
      setLoading(false)
    );
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Ethan",
      status: "Listening to his Like Songs",
    },
    {
      id: 2,
      name: "Min",
      status: "Exploring 'Chill Vibes' playlist",
    },
    {
      id: 3,
      name: "Trevor",
      avatar: "/images/avatar3.png",
      status: "Creating a new playlist",
    },
    {
      id: 4,
      name: "Milton",
      avatar: "/images/avatar4.png",
      status: "Offline",
    },
    {
        id: 5,
        name: "Anson",
        avatar: "/images/avatar4.png",
        status: "Offline",
      }
  ]);
  
  const [discussions, setDiscussions] = useState<
  {
    id: number;
    title: string;
    description: string;
    replies: number;
  }[]
>([
  {
    id: 1,
    title: "What are your favorite songs for studying?",
    description: "Share your go-to tracks that help you focus while studying! ♡",
    replies: 916,
  },
  {
    id: 2,
    title: "Upcoming Album Releases?",
    description: "Which albums are you most excited for this month? Bruno Mars¯\_(ツ)_/¯ Kendrick just dropped",
    replies: 180,
  },
  {
    id: 3,
    title: "Best Concerts You've Been To?",
    description: "Talk about your most unforgettable concert experiences. FEIN FEIN FEIN FIEN FIEN",
    replies: 167,
  },
  {
    id: 4,
    title: "Music Production Tips for Beginners",
    description:
      "Any advice for someone just starting out with music production? Should I just freestyle?",
    replies: 381,
  },
  {
    id: 5,
    title: "Lyrics vs. Beat - What Matters More?",
    description: "Do you focus more on the lyrics or the rhythm of a song? Bro I can't chooooooose",
    replies: 370,
  },
]);

const [qnaTopics, setQnaTopics] = useState<
  {
    id: number;
    question: string;
    answer: string;
  }[]
>([
  {
    id: 1,
    question: "How do I reset my password?",
    answer: "Go to the settings page, select 'Password Reset,' and follow the instructions.",
  },
  {
    id: 2,
    question: "Why isn’t my playlist syncing?",
    answer: "Ensure you are connected to the internet and have the latest app version installed.",
  },
  {
    id: 3,
    question: "Can I download songs for offline listening?",
    answer: "Yes, with a premium account, you can download songs by toggling the 'Download' button on any playlist.",
  },
  {
    id: 4,
    question: "How do I report inappropriate content?",
    answer: "Click the three dots next to the content, select 'Report,' and provide the necessary details.",
  },
  {
    id: 5,
    question: "What is the maximum number of playlists I can create?",
    answer: "There’s no limit! You can create as many playlists as you like.",
  },
]);


  return (
    
    <div className="pl-[2vw]">
        <div className="px-20 pt-10 pb-6">
        <h1 className="text-4xl font-bold text-white">Friends</h1>
        <p className="text-white text-opacity-75">See what they're doing</p>
      </div>
<div className="flex flex-wrap justify-center gap-6 px-20 py-10">
  {!loading
    ? friends.map((friend, index) => {
        const background =
          backgroundColors[index % backgroundColors.length]; // Cycle through colors
        return (
          <Card
            key={friend.id}
            style={{ background }}
            className="w-[15vw] h-[20vw] p-4 text-center text-white"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-lg font-semibold">{friend.name}</h2>
              <p className="text-sm text-opacity-75 mt-2">{friend.status}</p>
            </div>
          </Card>
        );
      })
    : Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          className="w-[15vw] h-[20vw] bg-[#747474] bg-opacity-20"
        />
      ))}
</div>


      <div className="px-20 pt-10 pb-6">
        <h1 className="text-4xl font-bold text-white">Community</h1>
        <p className="text-white text-opacity-75">Discussions for you</p>
      </div>
      <div className="bg-white h-[1px] bg-opacity-30 w-[92%] mx-auto" />
      <div className="flex justify-center items-center">
        <Carousel className="w-full text-white px-20 py-10">
            <CarouselContent>
            {!loading
                ? discussions.map((discussion) => (
                    <CarouselItem key={discussion.id}>
                    <div className="p-1">
                        <Card>
                        <CardContent className="flex h-[30vw] w-[21.5vw] flex-col items-start justify-center p-6 bg-[#747474] bg-opacity-20">
                            <h2 className="text-2xl text-[#c2a2e9] font-bold mb-2">
                            {discussion.title}
                            </h2>
                            <p className="text-white text-opacity-75 mb-4">
                            {discussion.description}
                            </p>
                            <span className="text-white text-opacity-50">
                            {discussion.replies} replies
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
            <h1 className="text-4xl font-bold text-white">Q&A</h1>
            <p className="text-white text-opacity-75">Technical Support</p>
            </div>
            <div className="bg-white h-[1px] bg-opacity-30 w-[92%] mx-auto" />
            <div className="flex justify-center items-center">
            <Carousel className="max-w-screen text-white px-16 py-10">
            <CarouselContent>
            {!loading
                ? qnaTopics.map((topic) => {
                    const randomGradient =
                    gradients[Math.floor(Math.random() * gradients.length)];
                    return (
                    <CarouselItem key={topic.id}>
                        <div className="p-1">
                        <Card style={{ background: randomGradient }}> {/* Replace with your desired color */}
                            <CardContent className="flex w-[17vw] h-[17vw] flex-col justify-center p-6 bg-[#747474] bg-opacity-20">
                            <h2 className="text-2xl font-semibold text-[#0E0317] mb-4">
                                {topic.question}
                            </h2>
                            <p className="text-sm text-black text-opacity-75">
                                {topic.answer}
                            </p>
                            </CardContent>
                        </Card>
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