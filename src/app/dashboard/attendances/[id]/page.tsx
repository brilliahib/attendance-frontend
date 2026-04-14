import BreadcrumbSet from "@/components/atoms/breadcrumb/BreadcrumbSet";
import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardEmployeeAttendanceDetailWrapper from "@/components/organisms/dashboard/employee/attendances/detail/DashboardEmployeeAttendanceDetailWrapper";

interface DashboardAttendanceDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DashboardAttendanceDetailPage({
  params,
}: DashboardAttendanceDetailPageProps) {
  const { id } = await params;
  return (
    <main>
      <BreadcrumbSet
        items={[
          {
            label: "Absensi",
            href: "/dashboard/attendances",
          },
          { label: "Detail Absensi" },
        ]}
      />
      <DashboardTitle title="Detail Absensi" />
      <DashboardEmployeeAttendanceDetailWrapper id={id} />
    </main>
  );
}
