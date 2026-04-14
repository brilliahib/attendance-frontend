import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Attendance } from "@/types/attendances/attendance";
import { CheckInType } from "@/validators/attendances/checkin-attendance-validator";
import { ErrorResponse } from "@/types/metadata/metadata";

interface CheckInResponse {
  data: Attendance;
  message: string;
}

export const checkInAttendanceHandler = async (
  body: CheckInType,
  token: string,
): Promise<CheckInResponse> => {
  const formData = new FormData();

  if (body.workDate) {
    formData.append("workDate", body.workDate);
  }

  if (body.checkInNote) {
    formData.append("checkInNote", body.checkInNote);
  }

  if (body.photo) {
    formData.append("photo", body.photo);
  }

  const { data } = await api.post(`/attendances/check-in`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useCheckInAttendance = (
  options?: UseMutationOptions<
    CheckInResponse,
    AxiosError<ErrorResponse>,
    { body: CheckInType }
  >,
) => {
  const { data: sessionData } = useSession();

  return useMutation({
    mutationFn: ({ body }) =>
      checkInAttendanceHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
