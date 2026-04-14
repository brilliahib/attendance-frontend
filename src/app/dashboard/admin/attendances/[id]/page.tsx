import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardAdminAttendanceDetailWrapper from "@/components/organisms/dashboard/admin/attendances/DashboardAdminAttendanceDetailWrapper";

interface DashboardAdminAttendanceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardAdminAttendanceDetailPage({
  params,
}: DashboardAdminAttendanceDetailPageProps) {
  const { id } = await params;
  return (
    <main>
      <BreadcrumbSet
        items={[
          {
            label: "Daftar Absensi",
            href: "/dashboard/admin/attendances",
          },
          { label: "Detail Absensi" },
        ]}
      />
      <DashboardTitle title="Detail Absensi" />
      <DashboardAdminAttendanceDetailWrapper id={id} />
    </main>
  );
}
