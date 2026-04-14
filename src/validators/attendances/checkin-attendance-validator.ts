import { z } from "zod";

export const checkInSchema = z.object({
  workDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return !isNaN(Date.parse(val));
      },
      { message: "Tanggal tidak valid" },
    ),
  checkInNote: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
  photo: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      { message: "File harus berupa gambar (JPG, JPEG, atau PNG)" },
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Ukuran file maksimal 5 MB",
    })
    .nullable()
    .optional(),
});

export type CheckInType = z.infer<typeof checkInSchema>;
