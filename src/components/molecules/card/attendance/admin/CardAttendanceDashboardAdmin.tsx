import { attendanceColumns } from "@/components/atoms/datacolumn/DataAttendance";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllAttendances } from "@/http/attendances/get-all-attendance";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CardAttendanceDashboardAdmin() {
  const { data: session } = useSession();

  const { data, isLoading } = useGetAllAttendances({
    token: session?.access_token as string,
  });

  return (
    <Card>
      <CardHeader className="flex md:flex-row flex-col gap-4 items-center md:justify-between">
        <div>
          <CardTitle>Absensi Terakhir</CardTitle>
          <CardDescription>
            Menampilkan 10 data absensi terakhir
          </CardDescription>
        </div>

        <Button asChild>
          <Link href="/dashboard/admin/attendances">Lihat Semua</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          data={data?.data ?? []}
          columns={attendanceColumns}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
