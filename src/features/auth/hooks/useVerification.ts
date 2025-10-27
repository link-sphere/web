"use client";

import { useMutation } from "@tanstack/react-query";
import { requestVerificationCodeApi, verifyCodeApi, checkEmailApi } from "../api/authApi";
import type { CodeRequest, VerificationRequest, VerificationCodeData } from "../api/types";
import type { ApiResponse } from "@/lib/types/api";

// 이메일 중복 확인
export function useCheckEmail() {
  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: (email) => checkEmailApi(email),
  });
}

// 인증 코드 발급
export function useRequestVerificationCode() {
  return useMutation<ApiResponse<VerificationCodeData>, Error, CodeRequest>({
    mutationFn: (data) => requestVerificationCodeApi(data),
  });
}

// 인증 코드 검증
export function useVerifyCode() {
  return useMutation<ApiResponse<null>, Error, VerificationRequest>({
    mutationFn: (data) => verifyCodeApi(data),
  });
}
