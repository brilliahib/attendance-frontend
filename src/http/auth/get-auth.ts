import { api } from "@/lib/axios";
import { Metadata } from "@/types/metadata/metadata";
import { User } from "@/types/user/user";

interface GetAuthResponse {
  meta: Metadata;
  data: User;
}

export const getAuthApiHandler = async (token: string): Promise<User> => {
  const { data } = await api.get<GetAuthResponse>("/auth/get-auth", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};
