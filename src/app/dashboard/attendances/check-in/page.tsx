import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardEmployeeAttendanceCheckInWrapper from "@/components/organisms/dashboard/employee/attendances/check-in/DashboardEmployeeAttendanceCheckInWrapper";

export default function DashboardEmployeeAttendanceCheckInPage() {
  return (
    <main>
      <BreadcrumbSet
        items={[
          {
            label: "Absensi",
            href: "/dashboard/attendances",
          },
          { label: "Absen Masuk" },
        ]}
      />
      <DashboardTitle title="Absen Masuk" />
      <DashboardEmployeeAttendanceCheckInWrapper />
    </main>
  );
}
