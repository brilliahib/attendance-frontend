"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface Props {
  dateRange?: DateRange;
  onDateChange: (v?: DateRange) => void;
}

export function FilterDate({ dateRange, onDateChange }: Props) {
  return (
    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:flex-nowrap md:items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal md:w-[210px]",
              !dateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate">
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd MMM yyyy")} -{" "}
                    {format(dateRange.to, "dd MMM yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "dd MMM yyyy")
                )
              ) : (
                "Pilih rentang tanggal"
              )}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateChange}
            numberOfMonths={1}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
