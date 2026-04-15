import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { ErrorResponse, Metadata } from "@/types/metadata/metadata";
import { Employee } from "@/types/employee/employee";

interface DeleteEmployeePayload {
  id: string;
  token: string;
}

interface DeleteEmployeeResponse {
  meta: Metadata;
  data: Employee;
}

export const DeleteEmployeeHandler = async ({
  id,
  token,
}: DeleteEmployeePayload): Promise<DeleteEmployeeResponse> => {
  const { data } = await api.delete(`/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteEmployee = (
  options?: UseMutationOptions<
    DeleteEmployeeResponse,
    AxiosError<ErrorResponse>,
    DeleteEmployeePayload
  >,
) => {
  return useMutation({
    mutationFn: DeleteEmployeeHandler,
    ...options,
  });
};
