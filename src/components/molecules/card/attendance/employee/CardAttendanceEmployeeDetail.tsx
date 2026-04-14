import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Attendance } from "@/types/attendances/attendance";
import { formatTime } from "@/utils/format-date";
import { getImageUrl } from "@/utils/get-image-url";
import Image from "next/image";

interface CardAttendanceEmployeeDetailProps {
  data?: Attendance;
  isLoading?: boolean;
}

export default function CardAttendanceEmployeeDetail({
  data,
  isLoading,
}: CardAttendanceEmployeeDetailProps) {
  const checkInImage = getImageUrl(data?.photoCheckInUrl);
  const checkOutImage = getImageUrl(data?.photoCheckOutUrl);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Absensi Hari Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">Absen Masuk</span>
              {isLoading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                <h3 className="font-medium text-base">
                  {formatTime(data?.checkInAt) || "Belum absen masuk"}
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
                Absen Pulang
              </span>
              {isLoading ? (
                <Skeleton className="h-5 w-40" />
              ) : (
                <h3 className="font-medium text-base">
                  {formatTime(data?.checkOutAt) || "Belum absen pulang"}
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
                <Skeleton className="h-40 w-full mt-2" />
              ) : checkInImage ? (
                <div className="relative mt-2 h-120 w-full overflow-hidden rounded-lg border">
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
            <div className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground">
                Foto Absen Pulang
              </span>

              {isLoading ? (
                <Skeleton className="h-40 w-full mt-2" />
              ) : checkOutImage ? (
                <div className="relative mt-2 h-120 w-full overflow-hidden rounded-lg border">
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
    </div>
  );
}
