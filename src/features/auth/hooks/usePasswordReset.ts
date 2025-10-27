"use client";

import { useMutation } from "@tanstack/react-query";
import { requestPasswordResetApi } from "../api/authApi";
import type { PasswordResetRequest } from "../api/types";
import type { ApiResponse } from "@/lib/types/api";

export function usePasswordReset() {
  return useMutation<ApiResponse<null>, Error, PasswordResetRequest>({
    mutationFn: (data) => requestPasswordResetApi(data),
  });
}
