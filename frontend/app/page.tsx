"use client";
import { FlipWords } from "@/components/ui/flip-words";
import { Highlight } from "@/components/ui/hero-highlight";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Home() {
  const genres = ["K-pop", "R&B", "Jazz", "Rap", "Classical", "Country"];

  return (
    <TracingBeam>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col text-center mx-auto ">
          <div className="text-2xl px-4 md:text-4xl lg:text-8xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug">
            <h1>Welcome To</h1>
            <Highlight className="text-[#0E0317]">
              GROOVEBOX
            </Highlight>
          </div>
          <div className="text-2xl text-white py-6">
            <div>Your go-to destination for discovering and listening to the latest hits!</div>
            <div>Get started to jump right into<FlipWords words={genres} className="text-[#c2a2e9] font-bold"/></div>
          </div>
        </div>
      </div>
    </TracingBeam>
  );
}
