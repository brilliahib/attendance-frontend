import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardEmployeeAttendanceHistoryWrapper from "@/components/organisms/dashboard/employee/attendances/history/DashboardEmployeeAttendanceHistoryWrapper";

export default function DashboardAttendancesHistoryPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Riwayat Absensi" }]} />
      <DashboardTitle title="Riwayat Absensi" />
      <DashboardEmployeeAttendanceHistoryWrapper />
    </main>
  );
}
