"use client";

import { useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  updateProfileSchema,
  UpdateProfileType,
} from "@/validators/auth/profile-validator";
import { useUpdateProfile } from "@/http/auth/update-profile";
import { formatDateWithDay } from "@/utils/format-date";

export default function FormUpdateProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const employee = session?.user?.employee;

  const defaultValues = useMemo<UpdateProfileType>(
    () => ({
      email: session?.user?.email ?? "",
      fullName: employee?.fullName ?? "",
      phone: employee?.phone ?? "",
      address: employee?.address ?? "",
    }),
    [session, employee],
  );

  const form = useForm<UpdateProfileType>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const { mutate: updateEmployeeHandler, isPending } = useUpdateProfile({
    onError: (error) => {
      const message =
        error.response?.data?.meta.message ?? "Terjadi kesalahan.";
      toast.error("Gagal memperbarui profil!", { description: message });
    },
    onSuccess: () => {
      toast.success("Berhasil memperbarui profil!");
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.refresh();
    },
  });

  const onSubmit = (body: UpdateProfileType) => {
    updateEmployeeHandler({
      body,
    });
  };

  if (status === "loading") {
    return (
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>

          {Array.from({ length: 6 }).map((_, i) => (
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Pekerjaan</CardTitle>
          <CardDescription>
            Informasi terkait pekerjaan Anda di perusahaan. Hubungi HR jika ada
            kesalahan data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Bergabung Pada</p>
              <p className="mt-1 font-medium">
                {formatDateWithDay(employee?.joinDate) ?? "-"}
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Kode Karyawan</p>
              <p className="mt-1 font-medium">
                {employee?.employeeCode ?? "-"}
              </p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Divisi</p>
              <p className="mt-1 font-medium">{employee?.department ?? "-"}</p>
            </div>

            <div className="rounded-xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Jabatan</p>
              <p className="mt-1 font-medium">{employee?.position ?? "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ganti Profil</CardTitle>
          <CardDescription>
            Perbarui informasi profil Anda. Pastikan untuk menyimpan perubahan
            setelah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid gap-6 md:grid-cols-2">
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
    </div>
  );
}
