"use client";
import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/hero-highlight";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function Login() {
  return (
    <TracingBeam>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white-0 to-white-800" >
        <div className="flex flex-col text-center mx-auto items-center">
        <div className="text-3xl px-4 md:text-3xl lg:text-4xl font-bold text-white max-w-3xl leading-relaxed lg:leading-snug mb-5">
            <h1 className="md:p-3 ">Log in to
            <Highlight className="text-[#0E0317] ml-2">
              GROOVEBOX
            </Highlight>
            </h1>
          </div>
          {/* Square Box Container */}
          <div className="bg-[#111111] rounded-lg shadow-lg p-20 w-[500px] h-[500px] flex flex-col items-stretch">
          <form className="flex flex-col space-y-4 w-full mb-10 ">
          <Button variant="outline" className="text-white text-2xl mb-20 grid-white m-1 rounded-full" >Log in with Google</Button>
          <Button variant="outline" className="text-white text-2xl mb-20 grid-white m-1 rounded-full" >Log in with Google</Button>
          </form>
          <hr className="border-t-2 border-white-400 w-1000000" />
            <form className="flex flex-col space-y-4 w-full mt-10 justify-end">
              <input
                type="text"
                placeholder="Username"
                className="p-2 rounded-md border bg-[#111111] text-white"
              />
              <input
                type="password"
                placeholder="Password"
                className="p-2 rounded-md border bg-[#111111] text-white"
              />
              <Button variant="outline" className="bg-purple text-white">
                Log In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </TracingBeam>
  );
}
