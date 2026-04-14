import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardEmployeeAttendanceCheckOutWrapper from "@/components/organisms/dashboard/employee/attendances/check-out/DashboardEmployeeAttendanceCheckOutWrapper";

export default function DashboardEmployeeAttendanceCheckOutPage() {
  return (
    <main>
      <BreadcrumbSet
        items={[
          {
            label: "Absensi",
            href: "/dashboard/attendances",
          },
          { label: "Absen Pulang" },
        ]}
      />
      <DashboardTitle title="Absen Pulang" />
      <DashboardEmployeeAttendanceCheckOutWrapper />
    </main>
  );
}
