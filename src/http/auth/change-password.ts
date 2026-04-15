import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import type { User } from "@/types/user/user";
import { ChangePasswordType } from "@/validators/auth/change-password-validator";
import { ErrorResponse, Metadata } from "@/types/metadata/metadata";

interface ChangePasswordResponse {
  meta: Metadata;
  data: User;
}

export const ChangePasswordHandler = async (
  body: ChangePasswordType,
  token: string,
): Promise<ChangePasswordResponse> => {
  const { data } = await api.post<ChangePasswordResponse>(
    "/auth/change-password",
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data;
};

export const useChangePassword = (
  options?: UseMutationOptions<
    ChangePasswordResponse,
    AxiosError<ErrorResponse>,
    ChangePasswordType
  >,
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (body: ChangePasswordType) =>
      ChangePasswordHandler(body, session?.access_token as string),
    ...options,
  });
};
