"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Attendance } from "@/types/attendances/attendance";
import { formatDateWithDay, formatTime } from "@/utils/format-date";
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
  const checkInImage = getImageUrl(data?.photoCheckInUrl);
  const checkOutImage = getImageUrl(data?.photoCheckOutUrl);

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Nama</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium text-base">
                {data?.employee?.fullName || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Kode Karyawan</span>
            {isLoading ? (
              <Skeleton className="h-5 w-32" />
            ) : (
              <h3 className="font-medium text-base">
                {data?.employee?.employeeCode || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Tanggal Kerja</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium text-base">
                {formatDateWithDay(data?.workDate) || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Jam Masuk</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium text-base">
                {formatTime(data?.checkInAt) || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">Jam Pulang</span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium text-base">
                {formatTime(data?.checkOutAt) || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Catatan Absen Masuk
            </span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium text-base">
                {data?.checkInNote || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Catatan Absen Pulang
            </span>
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <h3 className="font-medium text-base">
                {data?.checkOutNote || "-"}
              </h3>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Foto Absen Masuk
            </span>

            {isLoading ? (
              <Skeleton className="h-80 w-full mt-2" />
            ) : checkInImage ? (
              <div className="relative mt-2 h-80 w-full overflow-hidden rounded-lg border">
                <Image
                  src={checkInImage}
                  alt="Foto Absen Masuk"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <p className="mt-2">-</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Foto Absen Pulang
            </span>

            {isLoading ? (
              <Skeleton className="h-80 w-full mt-2" />
            ) : checkOutImage ? (
              <div className="relative mt-2 h-80 w-full overflow-hidden rounded-lg border">
                <Image
                  src={checkOutImage}
                  alt="Foto Absen Pulang"
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
