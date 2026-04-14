"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useUpdateEmployee } from "@/http/employees/update-employee";
import { employeeSchema } from "@/validators/employees/employee-validator";
import { useGetDetailEmployee } from "@/http/employees/get-detail-employee";
import {
  updateEmployeeSchema,
  UpdateEmployeeType,
} from "@/validators/employees/update-employee-validator";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface FormUpdateEmployeeProps {
  employeeId: string;
}

export default function FormUpdateEmployee({
  employeeId,
}: FormUpdateEmployeeProps) {
  const { data: session, status } = useSession();

  const { data: detailData, isPending: isLoadingDetail } = useGetDetailEmployee(
    employeeId,
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    },
  );

  const defaultData = useMemo(() => detailData?.data, [detailData]);

  const form = useForm<UpdateEmployeeType>({
    resolver: zodResolver(updateEmployeeSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      employeeCode: "",
      fullName: "",
      phone: "",
      department: "",
      position: "",
      joinDate: "",
      address: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!defaultData) return;

    form.reset({
      email: defaultData.user.email ?? "",
      employeeCode: defaultData.employeeCode ?? "",
      fullName: defaultData.fullName ?? "",
      phone: defaultData.phone ?? "",
      department: defaultData.department ?? "",
      position: defaultData.position ?? "",
      joinDate: defaultData.joinDate
        ? format(new Date(defaultData.joinDate), "yyyy-MM-dd")
        : "",
      address: defaultData.address ?? "",
      isActive: defaultData.user.isActive ?? true,
    });
  }, [defaultData, form]);

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateEmployeeHandler, isPending } = useUpdateEmployee({
    onError: (error) => {
      const message =
        error.response?.data?.meta.message ?? "Terjadi kesalahan.";
      toast.error("Gagal memperbarui karyawan!", { description: message });
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui karyawan!");
      queryClient.invalidateQueries({ queryKey: ["get-all-employees"] });
      queryClient.invalidateQueries({
        queryKey: ["get-detail-employee", employeeId],
      });
      router.push("/dashboard/admin/employees");
    },
  });

  const onSubmit = (body: UpdateEmployeeType) => {
    updateEmployeeHandler({ id: employeeId, body });
  };

  if (isLoadingDetail) {
    return (
      <Card>
        <CardContent className="space-y-6 pt-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <div className="flex justify-end">
            <Skeleton className="h-11 w-36 rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid md:grid-cols-2 gap-6">
            <Controller
              control={form.control}
              name="fullName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nama Lengkap</FieldLabel>
                  <Input {...field} placeholder="Masukkan nama lengkap" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="employeeCode"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Kode Karyawan</FieldLabel>
                  <Input {...field} placeholder="Contoh: EMP001" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="contoh@email.com"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Nomor Telepon</FieldLabel>
                  <Input {...field} placeholder="08xxxxxxxxxx" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="department"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Departemen</FieldLabel>
                  <Input {...field} placeholder="Contoh: Human Resource" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="position"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Jabatan</FieldLabel>
                  <Input {...field} placeholder="Contoh: Head of HRD" />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="joinDate"
              render={({ field, fieldState }) => {
                const selectedDate = field.value
                  ? new Date(field.value)
                  : undefined;

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Tanggal Masuk</FieldLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "dd MMMM yyyy", {
                                locale: id,
                              })
                            : "Pilih tanggal masuk"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : "",
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />

            <Controller
              control={form.control}
              name="isActive"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="md:col-span-2"
                >
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <FieldLabel>Status Aktif</FieldLabel>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan jika karyawan masih bekerja.
                      </p>
                    </div>

                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="md:col-span-2">
              <Controller
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Alamat</FieldLabel>
                    <Input {...field} placeholder="Masukkan alamat lengkap" />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
