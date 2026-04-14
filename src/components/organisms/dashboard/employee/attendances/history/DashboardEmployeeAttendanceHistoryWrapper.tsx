"use client";

import { attendanceColumns } from "@/components/atoms/datacolumn/DataAttendance";
import { attendanceHistoryColumns } from "@/components/atoms/datacolumn/DataAttendanceHistory";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/PaginationControls";
import { useGetHistoryAttendances } from "@/http/attendances/get-history-attendance";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function DashboardEmployeeAttendanceHistoryWrapper() {
  const { data: session } = useSession();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useGetHistoryAttendances({
    token: session?.access_token as string,
    params: {
      page,
      limit,
    },
  });

  return (
    <section className="space-y-6">
      <DataTable
        data={data?.data ?? []}
        columns={attendanceHistoryColumns}
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
