"use client";

import Navbar from "@/components/ui/navbar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { Sidebar } from "@/components/ui/sidebar";
import { useState } from "react";

export const NavbarWrapper = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) return null;
  return <Navbar />;
};

export const SidebarWrapper = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const isBadPage =
    pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname.startsWith("/library");

  if (isBadPage) return null;
  return <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="">
        <NavbarWrapper />
        <div className="flex">
          <SidebarWrapper
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main
            className={`flex-grow transition-padding duration-300 ${
              sidebarOpen ? "pl-[16vw]" : "pl-[0vw]"
            }`}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}