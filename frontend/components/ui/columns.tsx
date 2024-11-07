"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

//To-do change the type
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "#",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "album",
    header: "Album",
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
      const song = row.original
 
      return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-white bg-[#1c191c]">
                <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(song.title)}
                >
                Copy Title
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                <DropdownMenuItem>Remove from Playlist</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
