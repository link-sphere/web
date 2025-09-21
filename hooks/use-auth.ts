"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/types"
import { AuthService } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = AuthService.getUser()
    setUser(storedUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const result = await AuthService.login(email, password)
    if (result.success && result.data) {
      setUser(result.data.user)
    }
    return result
  }

  const signup = async (email: string, password: string) => {
    const result = await AuthService.signup(email, password)
    if (result.success && result.data) {
      setUser(result.data.user)
    }
    return result
  }

  const logout = async () => {
    const result = await AuthService.logout()
    setUser(null)
    return result
  }

  const isAuthenticated = !!user

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
  }
}
