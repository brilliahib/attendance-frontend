import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Employee } from "@/types/employee/employee";

interface GetAllEmployeeResponse {
  data: Employee[];
}

export const GetAllEmployeeHandler = async (
  token: string,
): Promise<GetAllEmployeeResponse> => {
  const { data } = await api.get<GetAllEmployeeResponse>("/employees", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllEmployee = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllEmployeeResponse, AxiosError>>,
) => {
  return useQuery({
    queryKey: ["get-all-employees"],
    queryFn: () => GetAllEmployeeHandler(token),
    ...options,
  });
};
