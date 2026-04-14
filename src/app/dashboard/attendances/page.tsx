import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardEmployeeAttendanceWrapper from "@/components/organisms/dashboard/employee/attendances/DashboardEmployeeAttendanceWrapper";

export default function DashboardAttendancesPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Absensi" }]} />
      <DashboardTitle title="Absensi" />
      <DashboardEmployeeAttendanceWrapper />
    </main>
  );
}
