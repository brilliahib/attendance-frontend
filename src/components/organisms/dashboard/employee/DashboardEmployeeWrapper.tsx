"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import CardDashboardSummaryEmployee from "@/components/molecules/card/dashboard/employee/CardDashboardSummaryEmployee";
import { useGetAttendanceToday } from "@/http/attendances/get-attendance-today";
import { useSession } from "next-auth/react";

export default function DashboardEmployeeWrapper() {
  const { data: session } = useSession();

  const { data, isLoading } = useGetAttendanceToday({
    token: session?.access_token as string,
  });

  return (
    <section>
      <DashboardTitle title="Dashboard Karyawan" />
      <CardDashboardSummaryEmployee data={data?.data} />
    </section>
  );
}
