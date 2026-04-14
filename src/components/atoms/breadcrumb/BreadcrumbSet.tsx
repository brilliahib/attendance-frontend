"use client";

import { useEffect } from "react";
import { useBreadcrumb, type BreadcrumbItem } from "./breadcrumb-context";

export default function BreadcrumbSet({ items }: { items: BreadcrumbItem[] }) {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems(items);
    return () => setItems(null);
  }, [items, setItems]);

  return null;
}
