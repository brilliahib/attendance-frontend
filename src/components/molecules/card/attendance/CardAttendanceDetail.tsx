"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Attendance } from "@/types/attendances/attendance";
import { getImageUrl } from "@/utils/get-image-url";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

interface CardAttendanceDetailProps {
  data?: Attendance;
  isLoading?: boolean;
}

export default function CardAttendanceDetail({
  data,
  isLoading,
}: CardAttendanceDetailProps) {
  const formatDate = (
    date?: string | Date | null,
    pattern = "EEEE, dd MMMM yyyy",
  ) => {
    if (!date) return "-";
    return format(new Date(date), pattern, { locale: id });
  };

  const formatDateTime = (date?: string | Date | null) => {
    if (!date) return "-";
    return format(new Date(date), "EEEE, dd MMMM yyyy, HH:mm", { locale: id });
  };

  const checkInImage = getImageUrl(data?.photoCheckInUrl);
  const checkOutImage = getImageUrl(data?.photoCheckOutUrl);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <div>
            <span className="text-sm text-muted-foreground">Nama</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium">{data?.employee?.fullName || "-"}</h3>
            )}
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Kode Karyawan</span>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <h3 className="font-medium">
                {data?.employee?.employeeCode || "-"}
              </h3>
            )}
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Tanggal</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium">{formatDate(data?.workDate)}</h3>
            )}
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Jam Masuk</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium">{formatDateTime(data?.checkInAt)}</h3>
            )}
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Jam Pulang</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium">
                {formatDateTime(data?.checkOutAt)}
              </h3>
            )}
          </div>

          <div>
            <span className="text-sm text-muted-foreground">
              Catatan Check In
            </span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium">
                {formatDateTime(data?.checkInNote)}
              </h3>
            )}
          </div>

          <div>
            <span className="text-sm text-muted-foreground">
              Catatan Check Out
            </span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium">
                {formatDateTime(data?.checkOutNote)}
              </h3>
            )}
          </div>

          <div className="sm:col-span-3">
            <span className="text-sm text-muted-foreground">Foto Check In</span>

            {isLoading ? (
              <Skeleton className="h-40 w-full mt-2" />
            ) : checkInImage ? (
              <div className="relative mt-2 h-40 w-full max-w-sm overflow-hidden rounded-lg border">
                <Image
                  src={checkInImage}
                  alt="Foto Check In"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <p className="mt-2">-</p>
            )}
          </div>

          <div className="sm:col-span-3">
            <span className="text-sm text-muted-foreground">
              Foto Check Out
            </span>

            {isLoading ? (
              <Skeleton className="h-40 w-full mt-2" />
            ) : checkOutImage ? (
              <div className="relative mt-2 h-40 w-full max-w-sm overflow-hidden rounded-lg border">
                <Image
                  src={checkOutImage}
                  alt="Foto Check Out"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <p className="mt-2">-</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
