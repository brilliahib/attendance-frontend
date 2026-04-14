import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatDateWithTime = (date?: string | Date | null) => {
  if (!date) return "-";
  return format(new Date(date), "EEEE, dd MMMM yyyy, HH:mm", { locale: id });
};

export const formatDateWithDay = (
  date?: string | Date | null,
  pattern = "EEEE, dd MMMM yyyy",
) => {
  if (!date) return "-";
  return format(new Date(date), pattern, { locale: id });
};

export const formatTime = (date?: Date | string | null): string => {
  if (!date) return "--:--";
  return format(new Date(date), "HH:mm", { locale: id });
};
