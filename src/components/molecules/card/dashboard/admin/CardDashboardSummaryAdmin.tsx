import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, LogIn, LogOut } from "lucide-react";
import { DashboardSummary } from "@/types/dashboard/dashboard-summary";

interface CardDashboardSummaryAdminProps {
  data?: DashboardSummary;
  isLoading?: boolean;
}

export default function CardDashboardSummaryAdmin({
  data,
  isLoading,
}: CardDashboardSummaryAdminProps) {
  const cards = [
    {
      key: "totalEmployees",
      label: "Total Karyawan",
      icon: Users,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      value: data?.totalEmployees?.toString() ?? "--",
      hasData: data?.totalEmployees !== undefined,
      subtext: "Karyawan terdaftar",
    },
    {
      key: "averageCheckinTime",
      label: "Rata-rata Masuk",
      icon: LogIn,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      value: data?.averageCheckinTime ?? "--:--",
      hasData: !!data?.averageCheckinTime,
      subtext: "Rata-rata jam absen masuk",
    },
    {
      key: "averageCheckoutTime",
      label: "Rata-rata Pulang",
      icon: LogOut,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      value: data?.averageCheckoutTime ?? "--:--",
      hasData: !!data?.averageCheckoutTime,
      subtext: "Rata-rata jam absen pulang",
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
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
