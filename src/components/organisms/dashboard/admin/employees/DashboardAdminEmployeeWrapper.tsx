"use client";

import AlertDialogDeleteEmployee from "@/components/atoms/alert-dialog/employee/AlertDialogDeleteEmployee";
import { employeeColumns } from "@/components/atoms/datacolumn/DataEmployee";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/PaginationControls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useDeleteEmployee } from "@/http/employees/delete-employee";
import { useGetAllEmployee } from "@/http/employees/get-all-employee";
import { Employee } from "@/types/employee/employee";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardAdminEmployeeWrapper() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 600);

  const [isSelectedDeleteEmployee, setIsSelectedDeleteEmployee] =
    useState<Employee | null>(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);

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

  const deleteEmployeeHandler = (data: Employee) => {
    setIsSelectedDeleteEmployee(data);
    setIsDialogDeleteOpen(true);
  };

  const { mutate: deleteEmployee } = useDeleteEmployee({
    onError: (error) => {
      toast.error("Gagal menghapus karyawan!", {
        description:
          error.response?.data.meta.message ||
          "Terjadi kesalahan saat menghapus karyawan.",
      });
    },
    onSuccess: () => {
      setIsSelectedDeleteEmployee(null);
      toast.success("Berhasil menghapus karyawan!");
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-employees",
          { search: debouncedSearch, page, limit },
        ],
      });
    },
  });

  const handleDeleteEmployee = () => {
    if (isSelectedDeleteEmployee) {
      deleteEmployee({
        id: isSelectedDeleteEmployee.id,
        token: session?.access_token as string,
      });
    }
  };

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
        columns={employeeColumns({ deleteEmployeeHandler })}
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

      {isSelectedDeleteEmployee && (
        <AlertDialogDeleteEmployee
          open={isDialogDeleteOpen}
          setOpen={setIsDialogDeleteOpen}
          confirmDelete={handleDeleteEmployee}
        />
      )}
    </section>
  );
}
