"use client";

import { useState, useEffect } from "react";
import type { User } from "@/lib/types";
import { AuthService } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = AuthService.getUser();
    setUser(storedUser);
    setIsLoading(false);

    const handleStorageChange = () => {
      setUser(AuthService.getUser());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await AuthService.login(email, password);
    if (result.success && result.data) {
      setUser(result.data.user);
    }
    return result;
  };

  const signup = async (email: string, password: string) => {
    const result = await AuthService.signup(email, password);
    if (result.success && result.data) {
      setUser(result.data.user);
    }
    return result;
  };

  const logout = () => {
    AuthService.autoLogout();
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };
}
