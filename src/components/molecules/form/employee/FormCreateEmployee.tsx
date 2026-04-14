"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useCreateEmployee } from "@/http/employees/create-employee";
import {
  employeeSchema,
  EmployeeType,
} from "@/validators/employees/employee-validator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { getErrorMessage } from "@/utils/error-response";

export default function FormCreateEmployee() {
  const form = useForm<EmployeeType>({
    resolver: zodResolver(employeeSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      employeeCode: "",
      fullName: "",
      phone: "",
      department: "",
      position: "",
      joinDate: "",
      address: "",
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createEmployeeHandler, isPending } = useCreateEmployee({
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error("Gagal menambahkan karyawan!", { description: message });
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan karyawan!");
      queryClient.invalidateQueries({ queryKey: ["get-all-employees"] });
      router.push("/dashboard/admin/employees");
    },
  });

  const onSubmit = (body: EmployeeType) => {
    createEmployeeHandler(body);
  };

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
                  <FieldLabel>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </FieldLabel>
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
                  <FieldLabel>
                    Kode Karyawan <span className="text-red-500">*</span>
                  </FieldLabel>
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
                  <FieldLabel>
                    Email <span className="text-red-500">*</span>
                  </FieldLabel>
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
                  <FieldLabel>
                    Nomor Telepon <span className="text-red-500">*</span>
                  </FieldLabel>
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
                  <FieldLabel>
                    Departemen <span className="text-red-500">*</span>
                  </FieldLabel>
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
                  <FieldLabel>
                    Jabatan <span className="text-red-500">*</span>
                  </FieldLabel>
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
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Tanggal Masuk <span className="text-red-500">*</span>
                  </FieldLabel>

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
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
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
              )}
            />

            <div className="md:col-span-2">
              <Controller
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Alamat <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} placeholder="Masukkan alamat lengkap" />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Password <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Minimal 8 karakter"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="confirm_password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Konfirmasi Password <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Ulangi password"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isPending}>
              {isPending ? "Loading..." : "Tambahkan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
