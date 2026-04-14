"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationMeta } from "@/types/pagination/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  pagination?: PaginationMeta;
  isLoading?: boolean;

  page: number;
  limit: number;

  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;

  limitOptions?: number[];
  siblingCount?: number;
  className?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function buildPageItems(current: number, total: number, siblingCount: number) {
  const items: Array<number | "..."> = [];
  const sc = Math.max(0, siblingCount);

  if (total <= 1) return [1];

  const left = clamp(current - sc, 1, total);
  const right = clamp(current + sc, 1, total);

  const showLeftDots = left > 2;
  const showRightDots = right < total - 1;

  items.push(1);

  if (showLeftDots) items.push("...");
  else for (let i = 2; i < left; i++) items.push(i);

  for (let i = left; i <= right; i++) {
    if (i !== 1 && i !== total) items.push(i);
  }

  if (showRightDots) items.push("...");
  else for (let i = right + 1; i < total; i++) items.push(i);

  items.push(total);

  const out: Array<number | "..."> = [];
  for (const it of items) {
    if (out[out.length - 1] === it) continue;
    out.push(it);
  }
  return out;
}

export function PaginationControls({
  pagination,
  isLoading = false,
  page,
  limit,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 50, 60, 100],
  siblingCount = 1,
  className,
}: Props) {
  const lastMetaRef = useRef<PaginationMeta | undefined>(pagination);
  useEffect(() => {
    if (pagination) lastMetaRef.current = pagination;
  }, [pagination]);
  const meta = pagination ?? lastMetaRef.current;

  const totalPages = meta?.totalPages ?? 1;
  const [uiPage, setUiPage] = useState(page);

  useEffect(() => {
    setUiPage(page);
  }, [page]);

  useEffect(() => {
    setUiPage((p) => clamp(p, 1, totalPages));
  }, [totalPages]);

  const currentPage = clamp(uiPage, 1, totalPages);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  const items = useMemo(() => {
    if (!meta) return [];
    return buildPageItems(currentPage, totalPages, siblingCount);
  }, [meta, currentPage, totalPages, siblingCount]);

  const totalItems = meta?.totalItems ?? 0;

  const from = totalItems ? (currentPage - 1) * limit + 1 : 0;
  const to = totalItems ? Math.min(currentPage * limit, totalItems) : 0;

  const disabled = isLoading || !meta;

  const goTo = (target: number) => {
    if (!meta) return;
    const next = clamp(target, 1, totalPages);
    setUiPage(next);
    onPageChange(next);
  };

  return (
    <div
      className={[
        "flex flex-col md:gap-3 gap-6 sm:flex-row sm:items-center sm:justify-between",
        className ?? "",
      ].join(" ")}
    >
      <div className="text-sm text-muted-foreground md:text-left text-center">
        {meta ? (
          <>
            Menampilkan {from} – {to} dari {totalItems} data
          </>
        ) : (
          "—"
        )}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-4">
        {onLimitChange && (
          <div className="flex items-center md:justify-start justify-center gap-2">
            <span className="text-sm text-muted-foreground">Limit: </span>
            <Select
              value={String(limit)}
              onValueChange={(v) => onLimitChange(Number(v))}
              disabled={isLoading}
            >
              <SelectTrigger className="h-9 w-[90px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {limitOptions.map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Previous page"
                aria-disabled={disabled || !canPrev}
                tabIndex={disabled || !canPrev ? -1 : 0}
                className={[
                  "h-9 w-9 p-0 flex items-center justify-center transition-none",
                  disabled || !canPrev
                    ? "pointer-events-none opacity-50"
                    : "border shadow-sm hover:bg-accent",
                ].join(" ")}
                onClick={(e) => {
                  e.preventDefault();
                  if (disabled || !canPrev) return;
                  goTo(currentPage - 1);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>

            {items.map((it, idx) =>
              it === "..." ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={it}>
                  <PaginationLink
                    href="#"
                    isActive={it === currentPage}
                    aria-disabled={disabled}
                    tabIndex={disabled ? -1 : 0}
                    className={[
                      "transition-none",
                      disabled
                        ? "pointer-events-none opacity-50"
                        : "font-semibold",
                      it === currentPage
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90"
                        : "border shadow-sm hover:bg-accent",
                    ].join(" ")}
                    onClick={(e) => {
                      e.preventDefault();
                      if (disabled) return;
                      goTo(it);
                    }}
                  >
                    {it}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationLink
                href="#"
                aria-label="Next page"
                aria-disabled={disabled || !canNext}
                tabIndex={disabled || !canNext ? -1 : 0}
                className={[
                  "h-9 w-9 p-0 flex items-center justify-center transition-none",
                  disabled || !canNext
                    ? "pointer-events-none opacity-50"
                    : "border shadow-sm hover:bg-accent",
                ].join(" ")}
                onClick={(e) => {
                  e.preventDefault();
                  if (disabled || !canNext) return;
                  goTo(currentPage + 1);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
