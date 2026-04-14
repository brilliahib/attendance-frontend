import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminEmployeesCreateWrapper from "@/components/organisms/dashboard/admin/employees/create/DashboardAdminEmployeeCreateWrapper";

export default function DashboardAdminEmployeesCreatePage() {
  return (
    <main>
      <BreadcrumbSet
        items={[
          {
            label: "Daftar Karyawan",
            href: "/dashboard/admin/employees",
          },
          { label: "Tambah Karyawan" },
        ]}
      />
      <DashboardTitle title="Tambah Karyawan" />
      <DashboardAdminEmployeesCreateWrapper />
    </main>
  );
}
