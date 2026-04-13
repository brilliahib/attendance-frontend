import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeStatusProps {
  active: boolean;
}

export default function BadgeStatus({ active }: BadgeStatusProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        active
          ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20"
          : "border-red-500 text-red-600 bg-red-50 dark:bg-red-900/20",
      )}
    >
      {active ? (
        <BadgeCheckIcon className="h-3.5 w-3.5" />
      ) : (
        <X className="h-3.5 w-3.5" />
      )}
      {active ? "Aktif" : "Tidak Aktif"}
    </Badge>
  );
}
