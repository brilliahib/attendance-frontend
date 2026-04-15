import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardSettingWrapper from "@/components/organisms/dashboard/setting/DashboardSettingWrapper";

export default function DashboardSettingPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Pengaturan" }]} />
      <DashboardTitle title="Pengaturan" />
      <DashboardSettingWrapper />
    </main>
  );
}
