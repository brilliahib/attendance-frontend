"use client";

import BadgeStatus from "@/components/atoms/badge/status/BadgeStatus";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@/types/employee/employee";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface CardEmployeeDetailProps {
  data?: Employee;
  isLoading?: boolean;
}

export default function CardEmployeeDetail({
  data,
  isLoading,
}: CardEmployeeDetailProps) {
  const formatDate = (date?: string | Date | null) => {
    if (!date) return "-";
    return format(new Date(date), "dd MMMM yyyy", { locale: id });
  };

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Nama Karyawan</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="text-base font-medium">{data?.fullName || "-"}</h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Status</span>
            {isLoading ? (
              <Skeleton className="h-5 w-20 rounded-full" />
            ) : (
              <BadgeStatus active={data?.user?.isActive ?? false} />
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Kode Karyawan</span>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <h3 className="text-base font-medium">
                {data?.employeeCode || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Email Karyawan
            </span>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <h3 className="text-base font-medium">
                {data?.user.email || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Divisi</span>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <h3 className="text-base font-medium">
                {data?.department || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Jabatan</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="text-base font-medium">{data?.position || "-"}</h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Tanggal Bergabung
            </span>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <h3 className="text-base font-medium">
                {formatDate(data?.joinDate)}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">No. WA</span>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <h3 className="text-base font-medium">{data?.phone || "-"}</h3>
            )}
          </div>

          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-sm text-muted-foreground">Alamat</span>
            {isLoading ? (
              <Skeleton className="h-5 w-full" />
            ) : (
              <h3 className="text-base font-medium">{data?.address || "-"}</h3>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
