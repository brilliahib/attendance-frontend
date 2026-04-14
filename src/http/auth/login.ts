import { api } from "@/lib/axios";
import { Metadata } from "@/types/metadata/metadata";
import { LoginType } from "@/validators/auth/login-validator";

interface LoginResponse {
  meta: Metadata;
  data: {
    id: number;
    token: string;
  };
}

export const loginApiHandler = async (
  body: LoginType,
): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", body);
  return data;
};
