import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Attendance } from "@/types/attendances/attendance";
import { ErrorResponse } from "@/types/metadata/metadata";
import { CheckOutType } from "@/validators/attendances/checkout-attendance-validator";

interface CheckOutResponse {
  data: Attendance;
  message: string;
}

export const checkOutAttendanceHandler = async (
  body: CheckOutType,
  token: string,
): Promise<CheckOutResponse> => {
  const formData = new FormData();

  if (body.checkOutNote) {
    formData.append("checkOutNote", body.checkOutNote);
  }

  if (body.photo) {
    formData.append("photo", body.photo);
  }

  const { data } = await api.post(`/attendances/check-out`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useCheckOutAttendance = (
  options?: UseMutationOptions<
    CheckOutResponse,
    AxiosError<ErrorResponse>,
    { body: CheckOutType }
  >,
) => {
  const { data: sessionData } = useSession();

  return useMutation({
    mutationFn: ({ body }) =>
      checkOutAttendanceHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
