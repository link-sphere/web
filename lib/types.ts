export interface User {
  id: string
  email: string
  accountType: string
  planType: string
  createdAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordChangeRequest {
  token: string
  oldPassword: string
  newPassword: string
}

export interface VerificationRequest {
  email: string
  code: string
}

export interface EmailCheckRequest {
  email: string
}

export interface ApiResponse<T = any> {
  data: T | null
  statusCode: number
  message: string
}

export interface ApiErrorResponse {
  code: number
  message: {
    message: string
    error: string
    statusCode: number
  }
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  accountType: string
  planType: string
}

export interface AuthResponse extends ApiResponse<LoginResponse> {}
