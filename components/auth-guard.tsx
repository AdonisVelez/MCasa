"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, LogIn } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  isAuthenticated: boolean
  onLoginClick: () => void
  message?: string
  feature?: string
}

export function AuthGuard({ children, isAuthenticated, onLoginClick, message, feature }: AuthGuardProps) {
  if (isAuthenticated) {
    return <>{children}</>
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-8 text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {feature ? `${feature} Requiere Autenticación` : "Inicia Sesión Requerido"}
        </h3>
        <p className="text-gray-600 mb-6">
          {message || "Para acceder a esta funcionalidad necesitas iniciar sesión en tu cuenta de la iglesia."}
        </p>
        <Button onClick={onLoginClick} className="bg-blue-600 hover:bg-blue-700">
          <LogIn className="h-4 w-4 mr-2" />
          Iniciar Sesión
        </Button>
      </CardContent>
    </Card>
  )
}
