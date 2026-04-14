import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardWrapper from "@/components/organisms/dashboard/DashboardWrapper";

export default function DashboardPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Dashboard" }]} />

      <DashboardWrapper />
    </main>
  );
}
