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

export const SidebarWrapper = () => {
    const pathname = usePathname();
    const isBadPage = pathname === "/" || pathname === "/login" || pathname === "/signup"; 
    const [sidebarOpen, setSidebarOpen] = useState(false);
    if (isBadPage) return null;
    return <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />;
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <NavbarWrapper />
        <div className="flex">
          <SidebarWrapper />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}