"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input-two";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { auth } from "@/app/firebase/config" 
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { signInWithPopup, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

export default function page() {
  
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = (e.target as HTMLFormElement).email.value;
      const password = (e.target as HTMLFormElement).password.value;
      const firstName = (e.target as HTMLFormElement).firstname.value;
      const lastName = (e.target as HTMLFormElement).lastname.value;
      const router = useRouter();
  
      const userCredential = await createUserWithEmailAndPassword(email, password);
      if (userCredential) {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
        router.push("/login");
        console.log(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white">
      <h2 className="font-bold text-xl text-neutral-800">
        Welcome to Groovebox
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <button
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
          type="submit"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800" />
          <span className="text-neutral-700 text-sm">
            Sign up with Google
          </span>
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300  to-transparent my-8 h-[1px] w-full" />
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="confirmpassword">Confirm password</Label>
          <Input id="confirmpassword" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#0f0317] hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
