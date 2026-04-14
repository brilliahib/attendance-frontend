import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Attendance } from "@/types/attendances/attendance";

interface GetAttendanceTodayResponse {
  data: Attendance;
}

export const GetAttendanceTodayHandler = async ({
  token,
}: {
  token: string;
}): Promise<GetAttendanceTodayResponse> => {
  const { data } = await api.get<GetAttendanceTodayResponse>(
    "/attendances/today",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetAttendanceToday = ({
  token,
  options,
}: {
  token: string;
  options?: Partial<UseQueryOptions<GetAttendanceTodayResponse, AxiosError>>;
}) => {
  return useQuery({
    queryKey: ["get-attendance-today"],
    queryFn: () =>
      GetAttendanceTodayHandler({
        token,
      }),
    enabled: !!token,
    ...options,
  });
};
