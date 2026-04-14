import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Attendance } from "@/types/attendances/attendance";
import { format, differenceInMinutes } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Clock, LogIn, LogOut, Timer, ArrowRight } from "lucide-react";
import Link from "next/link";

interface CardDashboardSummaryEmployeeProps {
  data?: Attendance;
  isLoading?: boolean;
}

function formatTime(date?: Date | string | null): string {
  if (!date) return "--:--";
  return format(new Date(date), "HH:mm", { locale: localeId });
}

function calcWorkDuration(
  checkIn?: Date | string | null,
  checkOut?: Date | string | null,
): string {
  if (!checkIn || !checkOut) return "--";
  const totalMinutes = differenceInMinutes(
    new Date(checkOut),
    new Date(checkIn),
  );
  if (totalMinutes < 0) return "--";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}j ${minutes}m`;
}

export default function CardDashboardSummaryEmployee({
  data,
  isLoading,
}: CardDashboardSummaryEmployeeProps) {
  const hasCheckIn = !!data?.checkInAt;
  const hasCheckOut = !!data?.checkOutAt;

  const cards = [
    {
      key: "checkin",
      label: "Absen Masuk",
      icon: LogIn,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      value: formatTime(data?.checkInAt),
      hasData: hasCheckIn,
      action: !hasCheckIn ? (
        <Button
          size="sm"
          className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-medium h-9"
          asChild
        >
          <Link
            href="/dashboard/attendances/check-in"
            className="flex items-center gap-2 w-full"
          >
            <LogIn className="h-4 w-4" />
            Absen Masuk Sekarang
            <ArrowRight className="h-4 w-4 ml-auto" />
          </Link>
        </Button>
      ) : null,
      subtext: hasCheckIn
        ? `Tercatat pada ${format(new Date(data!.checkInAt), "dd MMM yyyy", { locale: localeId })}`
        : null,
    },
    {
      key: "checkout",
      label: "Absen Pulang",
      icon: LogOut,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      value: formatTime(data?.checkOutAt),
      hasData: hasCheckOut,
      action:
        hasCheckIn && !hasCheckOut ? (
          <Button
            size="sm"
            className="w-full mt-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl gap-2 font-medium h-9"
            asChild
          >
            <Link
              href="/dashboard/attendances/check-out"
              className="flex items-center gap-2 w-full"
            >
              <LogOut className="h-4 w-4" />
              Absen Pulang Sekarang
              <ArrowRight className="h-4 w-4 ml-auto" />
            </Link>
          </Button>
        ) : !hasCheckIn ? (
          <p className="text-sm text-slate-400 mt-3 text-center">
            Anda belum melakukan absen masuk hari ini.
          </p>
        ) : null,
      subtext: hasCheckOut
        ? `Tercatat pada ${format(new Date(data!.checkOutAt!), "dd MMM yyyy", { locale: localeId })}`
        : null,
    },
    {
      key: "duration",
      label: "Total Jam Kerja",
      icon: Timer,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      value: calcWorkDuration(data?.checkInAt, data?.checkOutAt),
      hasData: hasCheckIn && hasCheckOut,
      action: null,
      subtext: hasCheckIn && hasCheckOut ? "Durasi kerja hari ini" : null,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-slate-100" />
                <div className="h-4 w-28 rounded bg-slate-100" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 rounded bg-slate-100 mb-2" />
              <div className="h-3 w-36 rounded bg-slate-100" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.key} className="bg-white rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex flex-row gap-3 items-center">
                <div
                  className={`${card.iconBg} p-2.5 rounded-xl flex-shrink-0`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} />
                </div>
                <CardTitle className="text-sm font-semibold">
                  {card.label}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <p
                className={`text-3xl font-bold tracking-tight ${
                  card.hasData ? "text-slate-800" : "text-slate-300"
                }`}
              >
                {card.value}
              </p>
              <p className="text-xs text-slate-400 mt-1">{card.subtext}</p>
              {card.action}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
