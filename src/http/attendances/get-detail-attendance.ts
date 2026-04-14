import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Attendance } from "@/types/attendances/attendance";

interface GetDetailAttendanceResponse {
  data: Attendance;
}

export const GetDetailAttendanceHandler = async (
  id: string,
  token: string,
): Promise<GetDetailAttendanceResponse> => {
  const { data } = await api.get<GetDetailAttendanceResponse>(
    `/attendances/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailAttendance = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailAttendanceResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-detail-attendance", id],
    queryFn: () => GetDetailAttendanceHandler(id, token),
    ...options,
  });
};
