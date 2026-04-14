import { z } from "zod";

export const employeeSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirm_password: z.string().min(1, "Konfirmasi password wajib diisi"),
    employeeCode: z
      .string()
      .min(1, "Kode karyawan wajib diisi")
      .max(50, "Kode karyawan maksimal 50 karakter"),
    fullName: z
      .string()
      .min(1, "Nama lengkap wajib diisi")
      .max(100, "Nama lengkap maksimal 100 karakter"),
    phone: z
      .string()
      .min(1, "Nomor telepon wajib diisi")
      .max(20, "Nomor telepon maksimal 20 karakter")
      .regex(/^[0-9+\-\s()]+$/, "Format nomor telepon tidak valid"),
    department: z
      .string()
      .min(1, "Departemen wajib diisi")
      .max(100, "Departemen maksimal 100 karakter"),
    position: z
      .string()
      .min(1, "Jabatan wajib diisi")
      .max(100, "Jabatan maksimal 100 karakter"),
    address: z
      .string()
      .min(1, "Alamat wajib diisi")
      .max(500, "Alamat maksimal 500 karakter"),
    joinDate: z.string().min(1, "Tanggal masuk wajib diisi"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirm_password"],
  });

export type EmployeeType = z.infer<typeof employeeSchema>;
