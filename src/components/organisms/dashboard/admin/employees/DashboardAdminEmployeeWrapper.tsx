"use client";

import { employeeColumns } from "@/components/atoms/datacolumn/DataEmployee";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/PaginationControls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetAllEmployee } from "@/http/employees/get-all-employee";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardAdminEmployeeWrapper() {
  const { data: session } = useSession();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 600);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useGetAllEmployee({
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
        <Button asChild>
          <Link href="/dashboard/admin/employees/create">
            <Plus />
            Tambah Karyawan
          </Link>
        </Button>
      </div>

      <DataTable
        data={data?.data ?? []}
        columns={employeeColumns}
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
