import { z } from "zod";

const mustHaveLetterAndNumber = (val: string) => {
  const hasLetter = /[a-zA-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);
  return hasLetter && hasNumber;
};

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Password lama harus diisi." }),

    newPassword: z
      .string()
      .min(8, { message: "Password baru minimal 8 karakter." })
      .refine(mustHaveLetterAndNumber, {
        message: "Password baru minimal mengandung 1 huruf dan 1 angka.",
      }),

    confirmNewPassword: z
      .string()
      .min(8, { message: "Konfirmasi password minimal 8 karakter." })
      .refine(mustHaveLetterAndNumber, {
        message: "Konfirmasi password minimal mengandung 1 huruf dan 1 angka.",
      }),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Konfirmasi password baru tidak cocok.",
  });

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
