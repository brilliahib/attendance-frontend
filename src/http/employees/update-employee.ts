import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse } from "@/types/metadata/metadata";
import { Employee } from "@/types/employee/employee";
import { UpdateEmployeeType } from "@/validators/employees/update-employee-validator";

interface UpdateEmployeeResponse {
  data: Employee;
}

export const UpdateEmployeeHandler = async (
  id: string,
  body: UpdateEmployeeType,
  token: string,
): Promise<UpdateEmployeeResponse> => {
  const { data } = await api.patch(`/employees/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useUpdateEmployee = (
  options?: UseMutationOptions<
    UpdateEmployeeResponse,
    AxiosError<ErrorResponse>,
    { id: string; body: UpdateEmployeeType }
  >,
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: ({ id, body }) =>
      UpdateEmployeeHandler(id, body, session?.access_token ?? ""),
    ...options,
  });
};
