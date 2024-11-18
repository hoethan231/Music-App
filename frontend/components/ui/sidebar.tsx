"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SidebarHelper, SidebarBody } from "@/components/ui/sidebar-helper";
import { Playlist } from "@/components/ui/playlist";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

interface SidebarContainerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({ open, setOpen }: SidebarContainerProps) {
  const totalPlaylists = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={cn("rounded-md min-h-screen")}>
      <SidebarHelper open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-16">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-6 no-scrollbar">
            {open && (
              <div className="relative px-4 py-2">
                <IconSearch className="w-5 h-5 text-white absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search in your library"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-[#2E252E] text-[#BFBFBF] rounded-md w-full -ml-2 pl-9 pr-4 py-2 focus:outline-none"
                />
              </div>
            )}
            {open && (
              <div className="text-white text-sm -mb-4 mt-2">
                -ALL ({totalPlaylists})
              </div>
            )}
            <div className="mt-8">
              {open && (
                <Playlist searchQuery={searchQuery} count={totalPlaylists} />
              )}
            </div>
          </div>
          {!open && (
            <div className="absolute flex top-1/2">
              <IconArrowRight className="w-6 h-6 text-white" />
            </div>
          )}
        </SidebarBody>
      </SidebarHelper>
    </div>
  );
}
