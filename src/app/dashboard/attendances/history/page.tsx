import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";

export default function DashboardAttendancesHistoryPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Riwayat Absensi" }]} />
      <DashboardTitle title="Riwayat Absensi" />
    </main>
  );
}
