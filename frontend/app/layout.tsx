"use client";

import Navbar from "@/components/ui/navbar";
import { usePathname } from "next/navigation";
import "./globals.css";

export const NavbarWrapper = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    if (isHomePage) return null;
    return <Navbar />;
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <NavbarWrapper />
                {children}
            </body>
        </html>
    );
}
