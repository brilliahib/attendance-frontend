import { z } from "zod";

export const updateProfileSchema = z.object({
  email: z.string().email("Format email tidak valid").optional(),

  fullName: z
    .string()
    .min(1, "Nama lengkap tidak boleh kosong")
    .max(100, "Nama lengkap maksimal 100 karakter")
    .optional(),

  phone: z
    .string()
    .max(20, "Nomor telepon maksimal 20 karakter")
    .regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid")
    .optional(),

  address: z.string().max(500, "Alamat maksimal 500 karakter").optional(),
});

export type UpdateProfileType = z.infer<typeof updateProfileSchema>;
