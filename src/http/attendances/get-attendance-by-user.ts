import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { PaginationMeta } from "@/types/pagination/pagination";
import { Attendance } from "@/types/attendances/attendance";

interface GetAttendanceByUserParams {
  search?: string;
  limit?: number;
  page?: number;
  workDateFrom?: string;
  workDateTo?: string;
}

interface GetAttendanceByUserResponse {
  data: Attendance[];
  pagination: PaginationMeta;
}

export const GetAttendanceByUserHandler = async ({
  id,
  token,
  params,
}: {
  id: string;
  token: string;
  params?: GetAttendanceByUserParams;
}): Promise<GetAttendanceByUserResponse> => {
  const { data } = await api.get<GetAttendanceByUserResponse>(
    `/attendances/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    },
  );

  return data;
};

export const useGetAttendanceByUser = ({
  id,
  token,
  params,
  options,
}: {
  id: string;
  token: string;
  params?: GetAttendanceByUserParams;
  options?: Partial<UseQueryOptions<GetAttendanceByUserResponse, AxiosError>>;
}) => {
  return useQuery({
    queryKey: ["get-attendance-by-user", id, params],
    queryFn: () =>
      GetAttendanceByUserHandler({
        id,
        token,
        params,
      }),
    enabled: !!token && !!id,
    ...options,
  });
};
