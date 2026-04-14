import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse, Metadata } from "@/types/metadata/metadata";
import { Employee } from "@/types/employee/employee";
import { EmployeeType } from "@/validators/employees/employee-validator";

interface CreateEmployeeResponse {
  meta: Metadata;
  data: Employee;
}

export const CreateEmployeeHandler = async (
  body: EmployeeType,
  token: string,
) => {
  const { data } = await api.post("/auth/register", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useCreateEmployee = (
  options?: UseMutationOptions<
    CreateEmployeeResponse,
    AxiosError<ErrorResponse>,
    EmployeeType
  >,
) => {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: (body) =>
      CreateEmployeeHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
