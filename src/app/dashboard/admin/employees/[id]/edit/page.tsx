import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminEmployeeUpdateWrapper from "@/components/organisms/dashboard/admin/employees/edit/DashboardAdminEmployeeUpdateWrapper";

interface DashboardAdminEmployeeEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardAdminEmployeeEditPage({
  params,
}: DashboardAdminEmployeeEditPageProps) {
  const { id } = await params;

  return (
    <main>
      <BreadcrumbSet
        items={[
          {
            label: "Daftar Karyawan",
            href: "/dashboard/admin/employees",
          },
          { label: "Edit Karyawan" },
        ]}
      />
      <DashboardTitle title="Edit Karyawan" />
      <DashboardAdminEmployeeUpdateWrapper id={id} />
    </main>
  );
}
