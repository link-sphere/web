export const AUTH_ENDPOINTS = {
  CHECK_EMAIL: (email: string) => `/public/user?identifier=${encodeURIComponent(email)}`,
  LOGIN: "/auth/user/login",
  SIGNUP: "/auth/user/sign-up",
  REQUEST_CODE: "/auth/user/code",
  VERIFY_CODE: "/auth/user/certification",
  PASSWORD_RESET: (email: string) =>
    `/auth/user/temporary-password?email=${encodeURIComponent(email)}`,
  PASSWORD_CHANGE: "/auth/user/password",
  TOKEN_REISSUE: "/auth/user/token-reissue",
  COOKIE_DELETE: "/auth/cookie",
};
