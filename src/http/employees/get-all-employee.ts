import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Employee } from "@/types/employee/employee";
import { PaginationMeta } from "@/types/pagination/pagination";

interface GetAllEmployeeParams {
  search?: string;
  department?: string;
  limit?: number;
  page?: number;
}

interface GetAllEmployeeResponse {
  data: Employee[];
  pagination: PaginationMeta;
}

export const GetAllEmployeeHandler = async ({
  token,
  params,
}: {
  token: string;
  params?: GetAllEmployeeParams;
}): Promise<GetAllEmployeeResponse> => {
  const { data } = await api.get<GetAllEmployeeResponse>("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });

  return data;
};

export const useGetAllEmployee = ({
  token,
  params,
  options,
}: {
  token: string;
  params?: GetAllEmployeeParams;
  options?: Partial<UseQueryOptions<GetAllEmployeeResponse, AxiosError>>;
}) => {
  return useQuery({
    queryKey: ["get-all-employees", params],
    queryFn: () =>
      GetAllEmployeeHandler({
        token,
        params,
      }),
    enabled: !!token,
    ...options,
  });
};
