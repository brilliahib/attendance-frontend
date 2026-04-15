"use client";

import { attendanceByUserColumns } from "@/components/atoms/datacolumn/DataAttendanceByUser";
import { FilterDate } from "@/components/atoms/filter/date/FilterDate";
import CardEmployeeDetail from "@/components/molecules/card/employee/CardEmployeeDetail";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/PaginationControls";
import { useGetAttendanceByUser } from "@/http/attendances/get-attendance-by-user";
import { useGetDetailEmployee } from "@/http/employees/get-detail-employee";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

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

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const toDateOnly = (date?: Date) =>
    date ? format(date, "yyyy-MM-dd") : undefined;

  const params = useMemo(() => {
    return {
      workDateFrom: toDateOnly(dateRange?.from),
      workDateTo: toDateOnly(dateRange?.to),
      page,
      limit,
    };
  }, [dateRange, page, limit]);

  const { data: attendances, isLoading: isLoadingAttendances } =
    useGetAttendanceByUser({
      id: data?.data.userId as string,
      token: session?.access_token as string,
      params,
    });

  const handleDateChange = (v?: DateRange) => {
    setDateRange(v);
    setPage(1);
  };

  return (
    <section className="space-y-6">
      <CardEmployeeDetail data={data?.data} isLoading={isLoading} />
      <div className="space-y-6">
        <div className="flex md:flex-row flex-col gap-4 items-center md:justify-between">
          <h3 className="text-lg font-medium">Riwayat Absen</h3>
          <FilterDate dateRange={dateRange} onDateChange={handleDateChange} />
        </div>
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
