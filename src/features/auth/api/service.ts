import api from "@/lib/axios";
import type { User } from "./types";
import { refreshTokenApi } from "./authApi";
import { AUTH_ENDPOINTS } from "./endpoint";

export class AuthService {
  private static readonly USER_KEY = "user";
  private static readonly TOKEN_KEY = "accessToken";

  // --------------------
  // AccessToken 관리
  // --------------------
  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static setAccessToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // --------------------
  // 유저 정보 관리
  // --------------------
  static setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static getUser(): User | null {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(this.USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  // --------------------
  // 세션 / 로그아웃
  // --------------------
  static clearSession(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static autoLogout() {
    this.clearSession();
    return { success: true, message: "인증이 만료되어 자동 로그아웃되었습니다." };
  }

  static async logout(): Promise<{ success: boolean; message?: string }> {
    try {
      const res = await api.delete(AUTH_ENDPOINTS.COOKIE_DELETE);
      this.clearSession();
      return { success: true, message: res.data?.message || "쿠키 삭제 완료" };
    } catch (error) {
      console.error("쿠키 삭제 실패:", error);
      this.clearSession();
      return { success: false, message: "쿠키 삭제 실패" };
    }
  }

  // --------------------
  // 토큰 재발급
  // --------------------
  static async refreshAccessToken() {
    try {
      const result = await refreshTokenApi();
      if (result.success && result.data?.accessToken) {
        this.setAccessToken(result.data.accessToken);
        return { success: true, message: result.message };
      }
      return { success: false, message: "토큰 재발급 실패" };
    } catch {
      this.autoLogout();
      return { success: false, message: "토큰 재발급 실패" };
    }
  }
}
