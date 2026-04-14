"use client";

import CardAttendanceDetail from "@/components/molecules/card/attendance/CardAttendanceDetail";
import { useGetDetailAttendance } from "@/http/attendances/get-detail-attendance";
import { useSession } from "next-auth/react";

interface DashboardEmployeeAttendanceDetailWrapperProps {
  id: string;
}

export default function DashboardEmployeeAttendanceDetailWrapper({
  id,
}: DashboardEmployeeAttendanceDetailWrapperProps) {
  const { data: session } = useSession();

  const { data, isLoading } = useGetDetailAttendance(
    id,
    session?.access_token as string,
  );

  return (
    <section>
      <CardAttendanceDetail data={data?.data} isLoading={isLoading} />
    </section>
  );
}
