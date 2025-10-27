import api from "@/lib/axios";
import { AUTH_ENDPOINTS } from "./endpoint";
import type {
  EmailCheckRequest,
  LoginRequest,
  SignupRequest,
  PasswordChangeRequest,
  PasswordResetRequest,
  VerificationRequest,
  CodeRequest,
  LoginResponse,
  VerificationCodeData,
} from "./types";
import type { ApiResponse } from "@/lib/types/api";
import { AuthService } from "./service";

// AccessToken 헤더 생성 함수
const authHeader = () => {
  const token = AuthService.getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --------------------
// 이메일 중복 확인
// --------------------
export const checkEmailApi = async (
  identifier: EmailCheckRequest["identifier"]
): Promise<ApiResponse<null>> => {
  const res = await api.get<ApiResponse<null>>(AUTH_ENDPOINTS.CHECK_EMAIL(identifier));
  return res.data;
};

// --------------------
// 로그인
// --------------------
export const loginApi = async (
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const res = await api.post<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.LOGIN,
    data
  );
  return res.data;
};

// --------------------
// 회원가입
// --------------------
export const signupApi = async (
  data: SignupRequest
): Promise<ApiResponse<LoginResponse>> => {
  const res = await api.post<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.SIGNUP,
    data
  );
  return res.data;
};

// --------------------
// 유저 인증 번호 발급
// --------------------
export const requestVerificationCodeApi = async (
  data: CodeRequest
): Promise<ApiResponse<VerificationCodeData>> => {
  const res = await api.post<ApiResponse<VerificationCodeData>>(
    AUTH_ENDPOINTS.REQUEST_CODE,
    data
  );
  return res.data;
};

// --------------------
// 유저 인증 번호 인증
// --------------------
export const verifyCodeApi = async (
  data: VerificationRequest
): Promise<ApiResponse<null>> => {
  const res = await api.post<ApiResponse<null>>(
    AUTH_ENDPOINTS.VERIFY_CODE,
    data
  );
  return res.data;
};

// --------------------
// 임시 비밀번호 발급
// --------------------
export const requestPasswordResetApi = async (
  data: PasswordResetRequest
): Promise<ApiResponse<null>> => {
  const res = await api.get<ApiResponse<null>>(
    AUTH_ENDPOINTS.PASSWORD_RESET(data.email));
  return res.data;
};

// --------------------
// 비밀번호 변경
// --------------------
export const changePasswordApi = async (
  data: PasswordChangeRequest
): Promise<ApiResponse<null>> => {
  const res = await api.patch<ApiResponse<null>>(
    AUTH_ENDPOINTS.PASSWORD_CHANGE,
    data,
    { headers: authHeader() }
  );
  return res.data;
};

// --------------------
// 토큰 재발급
// --------------------
export const refreshTokenApi = async (): Promise<ApiResponse<LoginResponse>> => {
  const res = await api.post<ApiResponse<LoginResponse>>(
    AUTH_ENDPOINTS.TOKEN_REISSUE,
    {}
  );
  return res.data;
};
