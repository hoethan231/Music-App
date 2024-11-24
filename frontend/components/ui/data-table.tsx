"use client"

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlayer } from '@/lib/PlayerContext';
import { Skeleton } from "./skeleton";

import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { app, auth } from '@/app/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  fetching: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fetching,
}: DataTableProps<TData, TValue>) {
  const db = getFirestore(app);
  const [user] = useAuthState(auth);
  const { playSong } = usePlayer();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 999999,
  });

  const [updating, setUpdating] = useState(false);
  const [playlists, setPlaylists] = useState<
    {
      createdAt: string;
      description: string;
      img: string;
      name: string;
      songs: TData[];
      uid: string;
    }[]
  >([]);

  const fetchUserPlaylists = async (userID: string) => {
    const userDoc = await getDoc(doc(db, 'users', userID));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.playlists || [];
    }
    return [];
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      pagination,
      columnFilters,
      rowSelection,
    },
  })

  const handleRowClick = async (row: any) => {
    const song = row.original;
    playSong(`spotify:track:${song.id}`);
  };

  const handleAddToPlaylist = async (playlistID: string, idx: string) => {
    console.log(playlists);
    setUpdating(true);
    if (user) {
      const song = {
        ...data[(idx as unknown as number)],
      }
      const playlistIdx = playlists.findIndex((playlist) => playlist.name === playlistID);
      if (playlistIdx !== -1) {
        const updatedPlaylists = playlists.map((playlist, index) => {
          if (index === playlistIdx) {
            return {
              ...playlist,
              songs: [...playlist.songs, song],
            };
          }
          return playlist;
        });

        setPlaylists(updatedPlaylists);

        try {
          await updateDoc(doc(db, 'users', user.uid), {
            playlists: updatedPlaylists,
          });
          console.log('Song added to playlist');
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Playlist not found');
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserPlaylists(user.uid).then((data) => setPlaylists(data));
    }
  });

  return (
    <div className="h-full w-full flex justify-center flex-col mr-[6vw]">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter songs..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm text-white"
        />
      </div>
      <div className="w-full h-[70%] flex">
        <div className="text-white bg-[#898989]/[.20] rounded-2xl border-[#747474] border-2 w-full overflow-y-auto no-scrollbar">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell>
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
                              {!updating && Array.isArray(playlists) && playlists.map((playlist, idx) => {
                                if (idx !== 0) {
                                  return (
                                    <DropdownMenuItem
                                      key={idx}
                                      onClick={() => handleAddToPlaylist(playlist.name, row.id)}
                                    >
                                      {playlist.name}
                                    </DropdownMenuItem>
                                  );
                                }
                                return null;
                              })}
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <DropdownMenuItem>
                            <Trash className="h-4 w-4 mr-3" />
                            Remove from Playlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                fetching ?
                  (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <TableRow key={idx} className="w-full h-24">
                        {columns.map((column) => (
                          <TableCell key={column.id}>
                            <Skeleton className="w-full h-8" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) :
                  (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        Start by Adding Songs to your Playlist!
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}