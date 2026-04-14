import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PaginationMeta } from "@/types/pagination/pagination";
import { Attendance } from "@/types/attendances/attendance";

interface GetAllAttendancesParams {
  search?: string;
  limit?: number;
  page?: number;
  workDateFrom?: string;
  workDateTo?: string;
}

interface GetAllAttendancesResponse {
  data: Attendance[];
  pagination: PaginationMeta;
}

export const GetAllAttendancesHandler = async ({
  token,
  params,
}: {
  token: string;
  params?: GetAllAttendancesParams;
}): Promise<GetAllAttendancesResponse> => {
  const { data } = await api.get<GetAllAttendancesResponse>("/attendances", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return data;
};

export const useGetAllAttendances = ({
  token,
  params,
  options,
}: {
  token: string;
  params?: GetAllAttendancesParams;
  options?: Partial<UseQueryOptions<GetAllAttendancesResponse, AxiosError>>;
}) => {
  return useQuery({
    queryKey: ["get-all-attendances", params],
    queryFn: () =>
      GetAllAttendancesHandler({
        token,
        params,
      }),
    enabled: !!token,
    ...options,
  });
};
