"use client";

import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../api/authApi";
import type { PasswordChangeRequest } from "../api/types";
import type { ApiResponse } from "@/lib/types/api";

export function useChangePassword() {
  return useMutation<ApiResponse<null>, Error, PasswordChangeRequest>({
    mutationFn: (data) => changePasswordApi(data),
  });
}
