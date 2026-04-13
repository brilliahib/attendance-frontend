import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Employee } from "@/types/employee/employee";

interface GetDetailEmployeeResponse {
  data: Employee;
}

export const GetDetailEmployeeHandler = async (
  id: string,
  token: string,
): Promise<GetDetailEmployeeResponse> => {
  const { data } = await api.get<GetDetailEmployeeResponse>(
    `/employees/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useGetDetailEmployee = (
  id: string,
  token: string,
  options?: Partial<UseQueryOptions<GetDetailEmployeeResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-detail-employee", id],
    queryFn: () => GetDetailEmployeeHandler(id, token),
    ...options,
  });
};
