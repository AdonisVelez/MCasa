"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, LogOut, Church, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  currentScreen: string
  setCurrentScreen: (screen: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  userLoggedIn: boolean
  setUserLoggedIn: (loggedIn: boolean) => void
  user?: any
  onLogout: () => void
  setShowLoginModal: (show: boolean) => void
  setShowRegisterModal: (show: boolean) => void
}

const navigationItems = [
  { name: "Inicio", href: "principal" },
  { name: "Biblia", href: "biblia" },
  { name: "Música", href: "musica" },
  { name: "Testimonios", href: "testimonios" },
  { name: "Devocionales", href: "devocionales" },
  { name: "Eventos", href: "eventos" },
  { name: "Galería", href: "galeria" },
  { name: "Nosotros", href: "acerca" },
]

export function Navigation({
  currentScreen,
  setCurrentScreen,
  mobileMenuOpen,
  setMobileMenuOpen,
  userLoggedIn,
  user,
  onLogout,
  setShowLoginModal,
  setShowRegisterModal,
}: NavigationProps) {
  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-xl shadow-lg">
                <Church className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                  Casa de Vida
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Ministerio Cristiano</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => setCurrentScreen(item.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                    currentScreen === item.href
                      ? "text-blue-700 bg-blue-50 shadow-sm"
                      : "text-gray-600 hover:text-blue-700 hover:bg-blue-50/50",
                  )}
                >
                  {item.name}
                  {currentScreen === item.href && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {!userLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Ingresar
                  </Button>
                  <Button
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Registrarse
                  </Button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {user?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-700 font-medium">{user?.name || "Usuario"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Mi Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    setCurrentScreen(item.href)
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    currentScreen === item.href
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-600 hover:text-blue-700 hover:bg-gray-50",
                  )}
                >
                  {item.name}
                </button>
              ))}

              <div className="pt-3 border-t border-gray-100">
                {!userLoggedIn ? (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowLoginModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="w-full"
                    >
                      Ingresar
                    </Button>
                    <Button
                      onClick={() => {
                        setShowRegisterModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700"
                    >
                      Registrarse
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {user?.name
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("") || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        onLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
