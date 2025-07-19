"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  joinDate: string
  preferences: {
    bibleVersion: string
    notifications: boolean
    theme: "light" | "dark"
  }
}

export function useAuthStorage() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Cargar usuario del localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("church-user")
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
      }
    }
  }, [])

  const login = (email: string, password: string, name?: string) => {
    // Simular autenticación
    const userData: User = {
      id: Date.now().toString(),
      name: name || email.split("@")[0],
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=3b82f6&color=fff`,
      joinDate: new Date().toISOString(),
      preferences: {
        bibleVersion: "rvr1960",
        notifications: true,
        theme: "light",
      },
    }

    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("church-user", JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("church-user")
    // Limpiar otros datos del usuario
    localStorage.removeItem("bible-favorites")
    localStorage.removeItem("bible-bookmarks")
    localStorage.removeItem("bible-reading-plan")
  }

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("church-user", JSON.stringify(updatedUser))
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  }
}
