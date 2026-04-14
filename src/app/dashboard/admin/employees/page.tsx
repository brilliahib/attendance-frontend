import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminEmployeeWrapper from "@/components/organisms/dashboard/admin/employees/DashboardAdminEmployeeWrapper";

export default function DashboardAdminEmployeesPage() {
  return (
    <main>
      <BreadcrumbSet items={[{ label: "Daftar Karyawan" }]} />
      <DashboardTitle title="Daftar Karyawan" />
      <DashboardAdminEmployeeWrapper />
    </main>
  );
}
