"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";

//To-do change the type
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "idx",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          #
        </Button>
      );
    },
    cell: ({ row }) => {
      const song = row.original;
      return <div className="flex items-center justify-center">{song.idx}</div>;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
        </Button>
      );
    },
    cell: ({ row }) => {
      const song = row.original;
      return (
        <div className="flex items-center">
          <img
            src={song.img}
            alt={song.title}
            className="w-[3vw] h-[3vw] mr-2 rounded-lg"
          />
          <span>{song.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "artist",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Artist
        </Button>
      );
    },
  },
  {
    accessorKey: "album",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Album
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "length",
    header: "Length",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const song = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-white bg-[#1c191c]">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Plus className="h-4 w-4 mr-3" />
                Add to Playlist
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="text-white bg-[#1c191c] text-xs">
                <DropdownMenuItem>Playlist 1</DropdownMenuItem>
                <DropdownMenuItem>Playlist 2</DropdownMenuItem>
                <DropdownMenuItem>Playlist 3</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
              <Trash className="h-4 w-4 mr-3" />
              Remove from Playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];