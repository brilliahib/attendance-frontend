"use client";

import { attendanceColumns } from "@/components/atoms/datacolumn/DataAttendance";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/PaginationControls";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetAllAttendances } from "@/http/attendances/get-all-attendance";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardAdminAttendanceWrapper() {
  const { data: session } = useSession();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 600);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useGetAllAttendances({
    token: session?.access_token as string,
    params: {
      search: debouncedSearch,
      page,
      limit,
    },
  });

  return (
    <section className="space-y-6">
      <div className="flex md:flex-row flex-col md:justify-between gap-6">
        <Input
          placeholder="Cari nama karyawan..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full md:max-w-xs"
        />
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={attendanceColumns}
        isLoading={isLoading}
      />

      <PaginationControls
        pagination={data?.pagination}
        isLoading={isLoading}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={(l) => {
          setLimit(l);
          setPage(1);
        }}
        siblingCount={1}
        limitOptions={[10, 20, 50, 100]}
      />
    </section>
  );
}
