"use client";

import Navbar from "@/components/ui/navbar";
import { usePathname } from "next/navigation";
import "./globals.css";

export const NavbarWrapper = () => {
    const pathname = usePathname();
    const isBadPage = pathname === "/" || pathname === "/login" || pathname === "/signup";

    if (isBadPage) return null;
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
