import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";

export default function DashboardAdminPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Dashboard Admin" }]} />
      <DashboardTitle title="Dashboard Admin" />
    </main>
  );
}
