"use client";

import DashboardTitle from "@/components/atoms/typography/DashboardTitle";

export default function DashboardEmployeeWrapper() {
  return (
    <section>
      <div className="flex md:flex-row flex-col md:items-center md:justify-between md:gap-6 md:mb-0 mb-6">
        <DashboardTitle title="Dashboard Karyawan" />
      </div>
    </section>
  );
}
