"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

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
];