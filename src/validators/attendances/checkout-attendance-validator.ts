import { z } from "zod";

export const checkOutSchema = z.object({
  checkOutNote: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
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

export type CheckOutType = z.infer<typeof checkOutSchema>;
