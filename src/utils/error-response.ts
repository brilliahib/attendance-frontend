import { ErrorResponse } from "@/types/metadata/metadata";

export const getErrorMessage = (error: unknown) => {
  const err = error as {
    response?: {
      data?: ErrorResponse;
    };
  };

  const apiError = err.response?.data;

  const validationMessages =
    apiError?.meta.errors?.flatMap((item) => item.messages) ?? [];

  return validationMessages.length > 0
    ? validationMessages.join(", ")
    : (apiError?.meta.message ?? "Terjadi kesalahan.");
};
