import type { AuthTokens, User, LoginResponse } from "./types";

export class AuthService {
  private static readonly BASE_URL = "/api/proxy";

  private static getStoredTokens(): AuthTokens | null {
    if (typeof window === "undefined") return null;

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) return null;

    return { accessToken, refreshToken };
  }

  private static setTokens(tokens: AuthTokens): void {
    if (typeof window === "undefined") return;

    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }

  private static clearTokens(): void {
    if (typeof window === "undefined") return;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }

  private static setUser(user: User): void {
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

  static isAuthenticated(): boolean {
    const tokens = this.getStoredTokens();
    return !!tokens?.accessToken;
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

  static async login(email: string, password: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const result = await this.handleApiResponse<LoginResponse>(response);

      if (result.success && result.data) {
        const mockUser: User = {
          id: Date.now().toString(),
          email: email,
          accountType: result.data.accountType,
          planType: result.data.planType,
          createdAt: new Date().toISOString(),
        };

        const tokens: AuthTokens = {
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        };

        this.setTokens(tokens);
        this.setUser(mockUser);

        return {
          success: true,
          message: result.message,
          data: {
            user: mockUser,
            tokens: tokens,
          },
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

  static async signup(email: string, password: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/user/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const result = await this.handleApiResponse(response);

      if (result.success) {
        // After successful signup, automatically login
        return await this.login(email, password);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다",
      };
    }
  }

  static async logout() {
    try {
      const tokens = this.getStoredTokens();
      if (!tokens) {
        this.clearTokens();
        return { success: true, message: "로그아웃 완료" };
      }

      const response = await fetch(`${this.BASE_URL}/auth/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        }),
      });

      const result = await this.handleApiResponse(response);
      this.clearTokens();

      return {
        success: true,
        message: result.message || "로그아웃 완료",
      };
    } catch (error) {
      this.clearTokens();
      return { success: true, message: "로그아웃 완료" };
    }
  }

  static async requestPasswordReset(email: string) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/auth/user/temporary-password?identifier=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return await this.handleApiResponse(response);
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다",
      };
    }
  }

  static async changePassword(oldPassword: string, newPassword: string) {
    try {
      const tokens = this.getStoredTokens();
      if (!tokens) {
        return {
          success: false,
          message: "인증이 필요합니다",
        };
      }

      const response = await fetch(`${this.BASE_URL}/auth/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.accessToken}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
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

  static async requestVerificationCode(email: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/user/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
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

  static async verifyCode(email: string, code: string) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/user/certification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          code: Number.parseInt(code),
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

      if (response.ok) {
        return {
          success: false,
          message: "이미 사용중인 이메일입니다",
        };
      } else if (response.status === 404) {
        return {
          success: true,
          message: "사용 가능한 이메일입니다",
        };
      } else {
        return {
          success: false,
          message: "이메일 확인 중 오류가 발생했습니다",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다",
      };
    }
  }

  static async refreshTokens() {
    try {
      const tokens = this.getStoredTokens();
      if (!tokens) {
        return {
          success: false,
          message: "토큰이 없습니다",
        };
      }

      const response = await fetch(`${this.BASE_URL}/auth/user/token-reissue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: tokens.refreshToken,
        }),
      });

      const result = await this.handleApiResponse<LoginResponse>(response);

      if (result.success && result.data) {
        const newTokens: AuthTokens = {
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        };

        this.setTokens(newTokens);

        return {
          success: true,
          message: result.message,
          data: newTokens,
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
}
