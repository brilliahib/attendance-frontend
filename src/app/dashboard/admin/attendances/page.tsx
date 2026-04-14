import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminAttendanceWrapper from "@/components/organisms/dashboard/admin/attendances/DashboardAdminAttendanceWrapper";

export default function DashboardAdminAttendancesPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Daftar Absensi" }]} />
      <DashboardTitle title="Daftar Absensi" />
      <DashboardAdminAttendanceWrapper />
    </main>
  );
}
