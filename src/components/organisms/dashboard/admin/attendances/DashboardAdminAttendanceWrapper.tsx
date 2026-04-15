"use client";

import { attendanceColumns } from "@/components/atoms/datacolumn/DataAttendance";
import { FilterDate } from "@/components/atoms/filter/date/FilterDate";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { PaginationControls } from "@/components/molecules/pagination/PaginationControls";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetAllAttendances } from "@/http/attendances/get-all-attendance";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

export default function DashboardAdminAttendanceWrapper() {
  const { data: session } = useSession();

  const [searchInput, setSearchInput] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const debouncedSearch = useDebounce(searchInput, 600);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const toDateOnly = (date?: Date) =>
    date ? format(date, "yyyy-MM-dd") : undefined;

  const params = useMemo(() => {
    return {
      search: debouncedSearch,
      workDateFrom: toDateOnly(dateRange?.from),
      workDateTo: toDateOnly(dateRange?.to),
      page,
      limit,
    };
  }, [debouncedSearch, dateRange, page, limit]);

  const { data, isLoading } = useGetAllAttendances({
    token: session?.access_token as string,
    params,
  });

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleDateChange = (v?: DateRange) => {
    setDateRange(v);
    setPage(1);
  };

  return (
    <section className="space-y-6">
      <div className="flex md:flex-row flex-col md:justify-between gap-6">
        <Input
          placeholder="Cari berdasarkan nama / kode..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full md:max-w-xs"
        />
        <FilterDate dateRange={dateRange} onDateChange={handleDateChange} />
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
