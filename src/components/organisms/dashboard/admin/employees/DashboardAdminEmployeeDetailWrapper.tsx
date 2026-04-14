"use client";

import { attendanceByUserColumns } from "@/components/atoms/datacolumn/DataAttendanceByUser";
import CardEmployeeDetail from "@/components/molecules/card/employee/CardEmployeeDetail";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/PaginationControls";
import { useGetAttendanceByUser } from "@/http/attendances/get-attendance-by-user";
import { useGetDetailEmployee } from "@/http/employees/get-detail-employee";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface DashboardAdminEmployeeDetailWrapperProps {
  id: string;
}

export default function DashboardAdminEmployeeDetailWrapper({
  id,
}: DashboardAdminEmployeeDetailWrapperProps) {
  const { data: session } = useSession();

  const { data, isLoading } = useGetDetailEmployee(
    id,
    session?.access_token as string,
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: attendances, isLoading: isLoadingAttendances } =
    useGetAttendanceByUser({
      id: data?.data.userId as string,
      token: session?.access_token as string,
      params: {
        page,
        limit,
      },
    });

  return (
    <section className="space-y-6">
      <CardEmployeeDetail data={data?.data} isLoading={isLoading} />
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Riwayat Absen</h3>
        <DataTable
          data={attendances?.data ?? []}
          isLoading={isLoadingAttendances}
          columns={attendanceByUserColumns}
        />
        <PaginationControls
          pagination={attendances?.pagination}
          isLoading={isLoadingAttendances}
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
      </div>
    </section>
  );
}
