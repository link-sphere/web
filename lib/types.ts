// --------------------
// 사용자 정보
// --------------------
export interface User {
  id: string;
  email: string;
  accountType: string;
  planType: string;
  createdAt: string;
}

// --------------------
// 토큰 관련
// --------------------
export interface AuthTokens {
  accessToken: string;
}

// --------------------
// 요청(Request)
// --------------------
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordChangeRequest {
  token: string;
  oldPassword: string;
  newPassword: string;
}

export interface VerificationRequest {
  email: string;
  code: string;
}

export interface EmailCheckRequest {
  email: string;
}

// --------------------
// 응답(Response)
// --------------------

export interface ApiResponse<T = any> {
  data: T | null;
  statusCode: number;
  message: string;
}

export interface ApiErrorResponse {
  code: number;
  message: {
    message: string;
    error: string;
    statusCode: number;
  };
}

// 로그인 / 회원가입 / 토큰 재발급 응답 형식
export interface LoginResponse {
  accessToken: string;
  accountType: string;
  planType: string;
}

export interface AuthResponse extends ApiResponse<LoginResponse> {}
