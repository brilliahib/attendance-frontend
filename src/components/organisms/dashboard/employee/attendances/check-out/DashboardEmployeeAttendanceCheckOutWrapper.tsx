"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Camera,
  Upload,
  X,
  RotateCcw,
  CheckCircle2,
  Clock,
  SwitchCamera,
  FileImage,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  checkOutSchema,
  CheckOutType,
} from "@/validators/attendances/checkout-attendance-validator";
import { useCheckOutAttendance } from "@/http/attendances/checkout-attendance";

type PhotoMode = "camera" | "upload";

export default function DashboardEmployeeAttendanceCheckOutWrapper() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [photoMode, setPhotoMode] = useState<PhotoMode>("camera");
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clock tick
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm<CheckOutType>({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      checkOutNote: "",
      photo: undefined,
    },
  });

  const { mutate: checkOut, isPending } = useCheckOutAttendance({
    onSuccess: () => {
      toast.success("Berhasil melalukan absen pulang!", {
        description: `Absensi pulang tercatat pada ${format(new Date(), "HH:mm")}`,
      });
      queryClient.invalidateQueries({ queryKey: ["get-attendance-today"] });
      router.push("/dashboard/attendances");
    },
    onError: (err) => {
      toast.error("Gagal melalukan absen pulang!", {
        description:
          err.response?.data.meta.message ||
          "Terjadi kesalahan. Silakan coba lagi.",
      });
    },
  });

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch {
      toast.error("Kamera tidak dapat diakses!", {
        description: "Izinkan akses kamera di browser Anda.",
      });
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setIsCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `check-in-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });
      const previewUrl = URL.createObjectURL(blob);
      setCapturedPhoto(previewUrl);
      setCapturedFile(file);
      form.setValue("photo", file, { shouldValidate: true });
      stopCamera();
    }, "image/jpeg");
  }, [form, stopCamera]);

  const flipCamera = useCallback(async () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    if (isCameraActive) await startCamera();
  }, [isCameraActive, startCamera]);

  useEffect(() => {
    if (photoMode === "camera" && isCameraActive) {
      startCamera();
    }
  }, [facingMode]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const resetPhotoState = () => {
    setCapturedPhoto(null);
    setCapturedFile(null);
    form.setValue("photo", undefined);
    stopCamera();
  };

  const handleModeSwitch = (mode: PhotoMode) => {
    resetPhotoState();
    setPhotoMode(mode);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCapturedPhoto(url);
    setCapturedFile(file);
    form.setValue("photo", file, { shouldValidate: true });
  };

  const onSubmit = (values: CheckOutType) => {
    checkOut({ body: values });
  };

  const photoError = form.formState.errors.photo;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-start md:flex-row flex-col md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight">
              {format(currentTime, "EEEE, dd MMMM yyyy", {
                locale: localeId,
              })}
            </h1>
            <p className="text-muted-foreground text-sm">
              Silahkan melakukan absen masuk dengan menggunakan kamera atau
              mengunggah foto.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-1">
            <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-mono text-lg font-semibold text-primary tabular-nums">
                {format(currentTime, "HH:mm:ss")} WIB
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => handleModeSwitch("camera")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors",
                photoMode === "camera"
                  ? "border-b-2 border-primary text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              )}
            >
              <Camera className="h-4 w-4" />
              Kamera
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch("upload")}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors",
                photoMode === "upload"
                  ? "border-b-2 border-primary text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
              )}
            >
              <Upload className="h-4 w-4" />
              Upload File
            </button>
          </div>

          <div className="p-5">
            {capturedPhoto ? (
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={capturedPhoto}
                  alt="Foto absensi"
                  className="w-full object-cover max-h-screen rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
                <button
                  type="button"
                  onClick={resetPhotoState}
                  className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-green-500/90 px-3 py-1 text-xs font-medium text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Foto siap
                </div>
              </div>
            ) : photoMode === "camera" ? (
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-xl bg-muted aspect-video flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={cn(
                      "w-full h-full object-cover rounded-xl",
                      !isCameraActive && "hidden",
                    )}
                  />
                  {!isCameraActive && (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground">
                      <Camera className="h-10 w-10 opacity-40" />
                      <p className="text-sm">Kamera belum aktif</p>
                    </div>
                  )}

                  {isCameraActive && (
                    <>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-120 w-120 rounded-full border-2 border-white/40 border-dashed" />
                      </div>
                      <button
                        type="button"
                        onClick={flipCamera}
                        className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                      >
                        <SwitchCamera className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="flex gap-2">
                  {!isCameraActive ? (
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={startCamera}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Aktifkan Kamera
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={stopCamera}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Matikan
                      </Button>
                      <Button
                        type="button"
                        className="flex-1"
                        onClick={capturePhoto}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Ambil Foto
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-muted/30 py-12 transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="rounded-full bg-primary/10 p-4">
                    <FileImage className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      Klik untuk upload foto
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      JPG, JPEG, PNG — Maks. 5 MB
                    </p>
                  </div>
                </button>
              </div>
            )}

            {photoError && (
              <p className="mt-2 text-xs text-destructive">
                {photoError.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-4">
          <Controller
            control={form.control}
            name="checkOutNote"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Catatan (opsional)</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Tambahkan catatan absensi..."
                  rows={3}
                  className="resize-none"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            <>Absen Pulang Sekarang</>
          )}
        </Button>
      </form>
    </div>
  );
}
