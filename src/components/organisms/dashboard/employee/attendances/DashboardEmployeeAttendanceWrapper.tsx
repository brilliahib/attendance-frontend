"use client";

import CardAttendanceSummary from "@/components/molecules/card/attendance/CardAttendanceSummary";
import { useGetAttendanceToday } from "@/http/attendances/get-attendance-today";
import { useSession } from "next-auth/react";

export default function DashboardEmployeeAttendanceWrapper() {
  const { data: session } = useSession();

  const { data, isLoading } = useGetAttendanceToday({
    token: session?.access_token as string,
  });

  return (
    <section>
      <CardAttendanceSummary data={data?.data} isLoading={isLoading} />
    </section>
  );
}
