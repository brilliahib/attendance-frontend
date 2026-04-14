"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Attendance } from "@/types/attendances/attendance";

export const attendanceHistoryColumns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => <p suppressHydrationWarning>{row.index + 1}</p>,
  },
  {
    accessorKey: "workDate",
    header: "Tanggal Kerja",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {format(new Date(row.original.workDate), "EEEE, dd MMMM yyyy", {
          locale: id,
        })}
      </p>
    ),
  },
  {
    accessorKey: "checkInAt",
    header: "Jam Masuk",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {format(new Date(row.original.checkInAt), "HH:mm", { locale: id })}
      </p>
    ),
  },
  {
    accessorKey: "checkOutAt",
    header: "Jam Pulang",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.checkOutAt
          ? format(new Date(row.original.checkOutAt), "HH:mm", { locale: id })
          : "Belum Absen Pulang"}
      </p>
    ),
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>

          <DropdownMenuItem>
            <Link
              href={`/dashboard/attendances/${data.id}`}
              className="flex items-center text-gray-700 hover:underline"
            >
              <Eye className="h-4 w-4 text-gray-700" />
              <span className="ml-2">Detail</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
