import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";

export default function DashboardAttendancesPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Absensi" }]} />
      <DashboardTitle title="Absensi" />
    </main>
  );
}
