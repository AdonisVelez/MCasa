"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface AuthModalsProps {
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
  showRegisterModal: boolean
  setShowRegisterModal: (show: boolean) => void
  onLogin: (email: string, password: string, remember: boolean) => boolean
  onRegister: (name: string, email: string, password: string, passwordConfirmation: string, terms: boolean) => boolean
}

export function AuthModals({
  showLoginModal,
  setShowLoginModal,
  showRegisterModal,
  setShowRegisterModal,
  onLogin,
  onRegister,
}: AuthModalsProps) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    terms: false,
  })

  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (!loginForm.email || !loginForm.password) {
      setLoginError("Por favor completa todos los campos")
      return
    }

    setLoginLoading(true)

    // Simular delay de autenticación
    setTimeout(() => {
      const success = onLogin(loginForm.email, loginForm.password, loginForm.remember)

      if (success) {
        setShowLoginModal(false)
        setLoginForm({ email: "", password: "", remember: false })
      } else {
        setLoginError("Credenciales incorrectas")
      }

      setLoginLoading(false)
    }, 1000)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")

    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.passwordConfirmation) {
      setRegisterError("Por favor completa todos los campos")
      return
    }

    if (registerForm.password !== registerForm.passwordConfirmation) {
      setRegisterError("Las contraseñas no coinciden")
      return
    }

    if (registerForm.password.length < 6) {
      setRegisterError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (!registerForm.terms) {
      setRegisterError("Debes aceptar los términos y condiciones")
      return
    }

    setRegisterLoading(true)

    // Simular delay de registro
    setTimeout(() => {
      const success = onRegister(
        registerForm.name,
        registerForm.email,
        registerForm.password,
        registerForm.passwordConfirmation,
        registerForm.terms,
      )

      if (success) {
        setShowRegisterModal(false)
        setRegisterForm({ name: "", email: "", password: "", passwordConfirmation: "", terms: false })
      } else {
        setRegisterError("Error al crear la cuenta")
      }

      setRegisterLoading(false)
    }, 1000)
  }

  return (
    <>
      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900">Iniciar Sesión</DialogTitle>
            <DialogDescription>Ingresa tus credenciales para acceder al sistema</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
                disabled={loginLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="******************"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
                disabled={loginLoading}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={loginForm.remember}
                  onCheckedChange={(checked) => setLoginForm({ ...loginForm, remember: checked as boolean })}
                  disabled={loginLoading}
                />
                <Label htmlFor="remember" className="text-sm">
                  Recordarme
                </Label>
              </div>
              <Button variant="link" className="text-sm text-blue-900 hover:text-blue-700 p-0" disabled={loginLoading}>
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={loginLoading}>
              {loginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
            <div className="text-center">
              <span className="text-gray-600 text-sm">¿No tienes cuenta?</span>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setShowLoginModal(false)
                  setShowRegisterModal(true)
                  setLoginError("")
                }}
                className="text-blue-900 font-medium text-sm hover:text-blue-700 ml-1 p-0"
                disabled={loginLoading}
              >
                Regístrate
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900">Crear Cuenta</DialogTitle>
            <DialogDescription>Únete a nuestra comunidad de fe</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            {registerError && (
              <Alert variant="destructive">
                <AlertDescription>{registerError}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                required
                disabled={registerLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Correo Electrónico</Label>
              <Input
                id="register-email"
                type="email"
                placeholder="tu@email.com"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
                disabled={registerLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Contraseña</Label>
              <Input
                id="register-password"
                type="password"
                placeholder="******************"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
                disabled={registerLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-confirmation">Confirmar Contraseña</Label>
              <Input
                id="password-confirmation"
                type="password"
                placeholder="******************"
                value={registerForm.passwordConfirmation}
                onChange={(e) => setRegisterForm({ ...registerForm, passwordConfirmation: e.target.value })}
                required
                disabled={registerLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={registerForm.terms}
                onCheckedChange={(checked) => setRegisterForm({ ...registerForm, terms: checked as boolean })}
                disabled={registerLoading}
              />
              <Label htmlFor="terms" className="text-sm">
                Acepto los{" "}
                <Button
                  variant="link"
                  className="text-blue-900 font-medium hover:text-blue-700 p-0 h-auto"
                  disabled={registerLoading}
                >
                  términos y condiciones
                </Button>
              </Label>
            </div>
            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={registerLoading}>
              {registerLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Registrarse"
              )}
            </Button>
            <div className="text-center">
              <span className="text-gray-600 text-sm">¿Ya tienes cuenta?</span>
              <Button
                type="button"
                variant="link"
                onClick={() => {
                  setShowRegisterModal(false)
                  setShowLoginModal(true)
                  setRegisterError("")
                }}
                className="text-blue-900 font-medium text-sm hover:text-blue-700 ml-1 p-0"
                disabled={registerLoading}
              >
                Inicia sesión
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
