"use client";

import CardEmployeeDetail from "@/components/molecules/card/employee/CardEmployeeDetail";
import { useGetDetailEmployee } from "@/http/employees/get-detail-employee";
import { useSession } from "next-auth/react";

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

  return (
    <section>
      <CardEmployeeDetail data={data?.data} isLoading={isLoading} />
    </section>
  );
}
