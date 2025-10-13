import type { User, LoginResponse } from "./types";
import api from "./axios";

export class AuthService {
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

  static getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  }

  static setAccessToken(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("accessToken", token);
  }

  static clearSession(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  static setUser(user: User): void {
    if (typeof window === "undefined") return;
    localStorage.setItem("user", JSON.stringify(user));
  }

  static getUser(): User | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static autoLogout() {
    this.clearSession();
    return { success: true, message: "인증이 만료되어 자동 로그아웃되었습니다." };
  }

  private static async handleApiResponse<T>(
    response: Response
  ): Promise<{ success: boolean; message: string; data?: T }> {
    try {
      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: data.message,
          data: data.data,
        };
      } else {
        // Handle error response format
        const errorMessage = data.message?.message || data.message || "오류가 발생했습니다";
        return {
          success: false,
          message: errorMessage,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다",
      };
    }
  }

  // 로그인
  static async login(email: string, password: string) {
    try {
      const res = await api.post<LoginResponse>(
        "/auth/user/login",
        { identifier: email, password },
        { withCredentials: true }
      );

      const { data } = res.data;
      const user: User = {
        id: Date.now().toString(),
        email,
        accountType: data.accountType,
        planType: data.planType,
        createdAt: new Date().toISOString(),
      };

      this.setAccessToken(data.accessToken);
      this.setUser(user);

      return { success: true, message: res.data.message, data: { user } };
    } catch (error: any) {
      const msg =
        error.response?.data?.message?.message ||
        error.response?.data?.message ||
        "로그인 중 오류가 발생했습니다.";
      return { success: false, message: msg };
    }
  }

  // 회원가입 (가입 후 accessToken, 쿠키 자동 발급)
  static async signup(email: string, password: string) {
    try {
      const res = await api.post<LoginResponse>(
        "/auth/user/sign-up",
        { identifier: email, password },
        { withCredentials: true }
      );

      const { data } = res.data;
      const user: User = {
        id: Date.now().toString(),
        email,
        accountType: data.accountType,
        planType: data.planType,
        createdAt: new Date().toISOString(),
      };

      this.setAccessToken(data.accessToken);
      this.setUser(user);

      return { success: true, message: res.data.message, data: { user } };
    } catch (error: any) {
      const msg =
        error.response?.data?.message?.message ||
        error.response?.data?.message ||
        "회원가입 중 오류가 발생했습니다.";
      return { success: false, message: msg };
    }
  }

  // 임시 비밀번호 발급
  static async requestPasswordReset(email: string) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/auth/user/temporary-password?email=${encodeURIComponent(email)}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        return await this.handleApiResponse(response);
      }

      if (response.status === 404) {
        return { success: false, message: "존재하지 않는 이메일 계정입니다." };
      }
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다",
      };
    }
  }

  // 비밀번호 변경
  static async changePassword(oldPassword: string, newPassword: string) {
    try {
      const accessToken = this.getAccessToken();
      if (!accessToken) {
        return { success: false, message: "인증이 필요합니다." };
      }

      const res = await api.patch(
        "/auth/user/password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        return {
          success: true,
          message: res.data.message || "비밀번호 변경 완료",
        };
      }

      return { success: false, message: "알 수 없는 오류가 발생했습니다." };
    } catch (error: any) {
      if (error.response?.status === 400) {
        const msg =
          error.response?.data?.message?.message ||
          error.response?.data?.message ||
          "비밀번호가 올바르지 않습니다.";
        return { success: false, message: msg };
      }

      if (error.response?.status === 500) {
        return { success: false, message: "서버 내부 오류가 발생했습니다." };
      }

      return { success: false, message: "네트워크 오류가 발생했습니다." };
    }
  }

  // 유저 인증 번호 발급
  static async requestVerificationCode(email: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/user/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const result = await this.handleApiResponse<number>(response);

      if (result.success && result.data) {
        return {
          success: true,
          message: result.message,
          data: { code: result.data.toString() },
        };
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다",
      };
    }
  }

  // 유저 인증 번호 인증
  static async verifyCode(email: string, code: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/user/certification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      });

      return await this.handleApiResponse(response);
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다",
      };
    }
  }

  // 아이디 중복 확인
  static async checkEmailAvailability(email: string) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/public/user?identifier=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        return { success: true, available: false, message: "사용 가능한 이메일입니다" };
      }
      if (response.status === 409) {
        return { success: false, available: true, message: "이미 사용중인 이메일입니다" };
      }
      return { success: false, available: false, message: `확인 실패 (status ${response.status})` };
    } catch {
      return { success: false, available: false, message: "네트워크 오류가 발생했습니다" };
    }
  }

  // 토큰 재발급
  static async refreshAccessToken() {
    try {
      const res = await api.post<LoginResponse>(
        "/auth/user/token-reissue",
        {},
        { withCredentials: true }
      );
      const { data } = res.data;

      if (data?.accessToken) {
        this.setAccessToken(data.accessToken);
        return { success: true, message: res.data.message };
      }

      return { success: false, message: "토큰 재발급 실패" };
    } catch (error: any) {
      this.autoLogout();
      return { success: false, message: "토큰 재발급 실패" };
    }
  }
}
