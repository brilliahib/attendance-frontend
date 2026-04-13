"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye, KeyRound, SquarePen, Trash2 } from "lucide-react";
import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import BadgeStatus from "../badge/status/BadgeStatus";
import { Employee } from "@/types/employee/employee";

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Lengkap",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.fullName}
      </p>
    ),
  },
  {
    accessorKey: "employeeCode",
    header: "Kode Karyawan",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.employeeCode}
      </p>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <BadgeStatus active={row.original.user.isActive} />,
  },
  {
    accessorKey: "department",
    header: "Divisi",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.department}
      </p>
    ),
  },
  {
    accessorKey: "position",
    header: "Posisi",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.position}
      </p>
    ),
  },
  {
    accessorKey: "phone",
    header: "No. WA",
    cell: ({ row }) => (
      <p suppressHydrationWarning className="line-clamp-1 md:line-clamp-2">
        {row.original.phone}
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
              href={`/dashboard/admin/employees/${data.id}`}
              className="flex items-center text-gray-700 hover:underline"
            >
              <Eye className="h-4 w-4 text-gray-700" />
              <span className="ml-2">Detail</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Link
              href={`/dashboard/admin/employees/${data.id}/edit`}
              className="flex cursor-pointer items-center text-yellow-700 hover:underline"
            >
              <SquarePen className="h-4 w-4 text-yellow-700" />
              <span className="ml-2">Edit</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div className="flex cursor-pointer items-center text-red-600 hover:text-red-800 hover:underline">
              <Trash2 className="h-4 w-4 text-red-600" />
              <span className="ml-2">Hapus</span>
            </div>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
