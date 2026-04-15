"use client";

import CardDashboardSummaryAdmin from "@/components/molecules/card/dashboard/admin/CardDashboardSummaryAdmin";
import { useGetDashboardSummary } from "@/http/dashboard/get-dashboard-summary";
import { useSession } from "next-auth/react";

export default function DashboardAdminWrapper() {
  const { data: session } = useSession();

  const { data, isLoading } = useGetDashboardSummary({
    token: session?.access_token as string,
  });

  return (
    <section>
      <CardDashboardSummaryAdmin data={data?.data} isLoading={isLoading} />
    </section>
  );
}
