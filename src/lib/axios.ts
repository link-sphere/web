import axios from "axios";
import { AuthService } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true, // ✅ refresh_token 쿠키 자동 전송
});

// ✅ 요청 인터셉터 — accessToken 자동 포함
api.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 — 401 시 자동 재발급
let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료 → 401 처리
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 다른 요청이 이미 재발급 중이면 기다렸다가 재시도
        return new Promise((resolve) => {
          refreshSubscribers.push((newToken) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(originalRequest));
            } else {
              resolve(Promise.reject(error));
            }
          });
        });
      }

      // 첫 번째 재발급 요청
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const result = await AuthService.refreshAccessToken();

        if (result.success) {
          const newToken = AuthService.getAccessToken();
          onRefreshed(newToken);
          isRefreshing = false;

          // accessToken 교체 후 재요청
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          // 재발급 실패 → 자동 로그아웃
          AuthService.autoLogout();
          onRefreshed(null);
          isRefreshing = false;
          return Promise.reject(error);
        }
      } catch {
        AuthService.autoLogout();
        onRefreshed(null);
        isRefreshing = false;
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
