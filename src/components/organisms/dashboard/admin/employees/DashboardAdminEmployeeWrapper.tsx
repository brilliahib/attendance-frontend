"use client";

import { employeeColumns } from "@/components/atoms/datacolumn/DataEmployee";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { useGetAllEmployee } from "@/http/employees/get-all-employee";
import { useSession } from "next-auth/react";

export default function DashboardAdminEmployeeWrapper() {
  const { data: session, status } = useSession();

  const { data, isLoading } = useGetAllEmployee(
    session?.access_token as string,
    {
      enabled: status === "authenticated" && !!session?.access_token,
    },
  );

  return (
    <section>
      <DataTable
        data={data?.data ?? []}
        columns={employeeColumns}
        isLoading={isLoading}
      />
    </section>
  );
}
