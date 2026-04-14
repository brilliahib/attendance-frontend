import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PaginationMeta } from "@/types/pagination/pagination";
import { Attendance } from "@/types/attendances/attendance";

interface GetHistoryAttendancesParams {
  search?: string;
  limit?: number;
  page?: number;
  workDateFrom?: string;
  workDateTo?: string;
}

interface GetHistoryAttendancesResponse {
  data: Attendance[];
  pagination: PaginationMeta;
}

export const GetHistoryAttendancesHandler = async ({
  token,
  params,
}: {
  token: string;
  params?: GetHistoryAttendancesParams;
}): Promise<GetHistoryAttendancesResponse> => {
  const { data } = await api.get<GetHistoryAttendancesResponse>(
    "/attendances/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    },
  );

  return data;
};

export const useGetHistoryAttendances = ({
  token,
  params,
  options,
}: {
  token: string;
  params?: GetHistoryAttendancesParams;
  options?: Partial<UseQueryOptions<GetHistoryAttendancesResponse, AxiosError>>;
}) => {
  return useQuery({
    queryKey: ["get-history-attendances", params],
    queryFn: () =>
      GetHistoryAttendancesHandler({
        token,
        params,
      }),
    enabled: !!token,
    ...options,
  });
};
