import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { ErrorResponse } from "@/types/metadata/metadata";
import { Employee } from "@/types/employee/employee";
import { UpdateEmployeeType } from "@/validators/employees/update-employee-validator";
import { UpdateProfileType } from "@/validators/auth/profile-validator";

interface UpdateProfileResponse {
  data: Employee;
}

export const UpdateProfileHandler = async (
  body: UpdateProfileType,
  token: string,
): Promise<UpdateProfileResponse> => {
  const { data } = await api.patch(`/auth/profile`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useUpdateProfile = (
  options?: UseMutationOptions<
    UpdateProfileResponse,
    AxiosError<ErrorResponse>,
    { body: UpdateProfileType }
  >,
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: ({ body }) =>
      UpdateProfileHandler(body, session?.access_token ?? ""),
    ...options,
  });
};
