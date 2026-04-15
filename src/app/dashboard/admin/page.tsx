import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminWrapper from "@/components/organisms/dashboard/admin/DashboardAdminWrapper";

export default function DashboardAdminPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Dashboard Admin" }]} />
      <DashboardTitle title="Dashboard Admin" />
      <DashboardAdminWrapper />
    </main>
  );
}
