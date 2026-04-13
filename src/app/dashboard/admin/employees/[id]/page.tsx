import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminEmployeeDetailWrapper from "@/components/organisms/dashboard/admin/employees/DashboardAdminEmployeeDetailWrapper";

interface DashboardAdminEmployeeDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardAdminEmployeeDetailPage({
  params,
}: DashboardAdminEmployeeDetailPageProps) {
  const { id } = await params;

  return (
    <main>
      <BreadcrumbSet
        items={[
          {
            label: "Daftar Karyawan",
            href: "/dashboard/admin/employees",
          },
          { label: "Detail Karyawan" },
        ]}
      />
      <DashboardTitle title="Detail Karyawan" />
      <DashboardAdminEmployeeDetailWrapper id={id} />
    </main>
  );
}
