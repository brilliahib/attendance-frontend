"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/validators/auth/change-password-validator";
import { useChangePassword } from "@/http/auth/change-password";
import { Card, CardContent } from "@/components/ui/card";

export default function FormChangePassword() {
  const router = useRouter();
  const { status } = useSession();

  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggle = (key: keyof typeof show) =>
    setShow((p) => ({ ...p, [key]: !p[key] }));

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutate: changePassword, isPending } = useChangePassword({
    onSuccess: () => {
      toast.success("Berhasil mengganti password!");
      form.reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error("Gagal mengganti password!", {
        description: error.response?.data?.meta?.message,
      });

      const fieldMap: Record<string, keyof ChangePasswordType> = {
        oldpassword: "oldPassword",
        old: "oldPassword",
        newpassword: "newPassword",
        password: "newPassword",
        confirmnewpassword: "confirmNewPassword",
        confirm: "confirmNewPassword",
      };

      const errors = error.response?.data?.meta?.errors ?? [];
      if (errors.length) {
        for (const e of errors) {
          const key = (e.field || "").toLowerCase();
          const rhfField = fieldMap[key];
          const msg = e.messages?.[0];

          if (rhfField && msg) {
            form.setError(rhfField, {
              type: "server",
              message: msg,
            });
          }
        }
      }
    },
  });

  const onSubmit = (body: ChangePasswordType) => {
    changePassword(body);
  };

  const disabled = status !== "authenticated" || isPending;

  return (
    <>
      <Card>
        <CardContent>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="grid gap-6 md:grid-cols-2">
              <Controller
                control={form.control}
                name="oldPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password Lama</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={show.old ? "text" : "password"}
                        placeholder="Masukkan password lama"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => toggle("old")}
                        tabIndex={-1}
                      >
                        {show.old ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password Baru</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={show.new ? "text" : "password"}
                        placeholder="Masukkan password baru"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => toggle("new")}
                        tabIndex={-1}
                      >
                        {show.new ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="confirmNewPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Konfirmasi Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={show.confirm ? "text" : "password"}
                        placeholder="Masukkan konfirmasi password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => toggle("confirm")}
                        tabIndex={-1}
                      >
                        {show.confirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={disabled}>
                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
