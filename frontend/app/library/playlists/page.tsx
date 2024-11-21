"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem
  } from "@/components/ui/carousel"
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { auth } from "@/app/firebase/config";
import { app } from '@/app/firebase/config';

const PlaylistsPage: React.FC = () => {
    const router = useRouter();
    const db = getFirestore(app);
    const [user] = useAuthState(auth);
    
    const [currentCard, setCurrentCard] = useState<number>(0);
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    if (!user) {
        router.push("/login");
    }

    const setIndex = (e: number) => {
        setCurrentCard(e+2);
    }

    const fetchUserPlaylists = async (userId: string) => {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.playlists || [];
        }
        return [];
    };

    useEffect(() => {
        const loadCards = async () => {
            const fetchedCards = user ? await fetchUserPlaylists(user.uid) : [];
            const pseudoCards = [{ id: 'pseudo' }, { id: 'pseudo' }];
            const allCards = [...pseudoCards, ...fetchedCards, ...pseudoCards];
            setCards(allCards);
            setLoading(false);
        };

        loadCards();
    }, [user]);

    return (
        <div className='bg-gradient-to-t from-[#1D1E21] to-[#180E18] h-[100vh]'>
            <div className="p-40">
                <h1 className='text-white text-4xl pb-4 font-bold'>Your Playlists</h1>
                <div className="flex">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full max-w-sm"
                        currentIndex={(index) => {setIndex(index); return index;}}
                        >
                        <CarouselContent>
                            {cards.map((card, index) => (
                                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5">
                                    <motion.div 
                                        animate={{
                                            height: currentCard === index ? "100%" : "80%",
                                            width: currentCard === index ? "100%" : "80%",
                                            transition: { duration: 0.15 },
                                        }}
                                        >
                                        <div
                                            className="relative group block p-2"
                                        >
                                            <AnimatePresence>
                                                {currentCard === index && (
                                                    <motion.span
                                                        className="absolute inset-0 h-full w-full bg-transparent block rounded-3xl border-4 z-[-1]"
                                                        layoutId="hoverBackground"
                                                        initial={{ opacity: 0 }}
                                                        animate={{
                                                        opacity: 1,
                                                        transition: { duration: 0.05 },
                                                        }}
                                                        exit={{
                                                        opacity: 0,
                                                        transition: { duration: 0.05 },
                                                        }}
                                                    />
                                                )}
                                            </AnimatePresence>
                                            {card.id === 'pseudo' ? 
                                                (<Card className='invisible'>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-3xl text-white font-semibold">{index - 1}</span>
                                                    </CardContent>
                                                </Card>) :
                                                (
                                                <Link
                                                    href={`/library/playlist/${card.name.toLowerCase().replace(" ", "-")}`}
                                                    key={index}
                                                    >
                                                <Card>
                                                    <img src={card.img} className='rounded-xl'/>
                                                </Card>
                                                </Link>)}
                                        </div>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default PlaylistsPage;