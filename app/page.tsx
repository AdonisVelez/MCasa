"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { AuthModals } from "@/components/auth-modals"
import { PrincipalScreen } from "@/components/screens/principal-screen"
import { BibliaScreen } from "@/components/screens/biblia-screen"
import { MusicaScreen } from "@/components/screens/musica-screen"
import { TestimoniosScreen } from "@/components/screens/testimonios-screen"
import { DevocionalScreen } from "@/components/screens/devocional-screen"
import { EventosScreen } from "@/components/screens/eventos-screen"
import { GaleriaScreen } from "@/components/screens/galeria-screen"
import { AcercaScreen } from "@/components/screens/acerca-screen"
import { Footer } from "@/components/footer"
import { useAuthStorage } from "@/hooks/use-auth-storage"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState("principal")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)

  const { user, isAuthenticated, login, logout } = useAuthStorage()

  const handleLogin = (email: string, password: string, remember: boolean) => {
    return login(email, password)
  }

  const handleRegister = (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    terms: boolean,
  ) => {
    if (password === passwordConfirmation && terms) {
      return login(email, password, name)
    }
    return false
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "principal":
        return <PrincipalScreen setCurrentScreen={setCurrentScreen} />
      case "biblia":
        return <BibliaScreen />
      case "musica":
        return <MusicaScreen />
      case "testimonios":
        return <TestimoniosScreen userLoggedIn={isAuthenticated} setShowLoginModal={setShowLoginModal} user={user} />
      case "devocionales":
        return <DevocionalScreen />
      case "eventos":
        return (
          <EventosScreen
            setShowEventModal={setShowEventModal}
            setCurrentEvent={setCurrentEvent}
            userLoggedIn={isAuthenticated}
            setShowLoginModal={setShowLoginModal}
          />
        )
      case "galeria":
        return <GaleriaScreen />
      case "acerca":
        return <AcercaScreen />
      default:
        return <PrincipalScreen setCurrentScreen={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        userLoggedIn={isAuthenticated}
        setUserLoggedIn={() => {}} // No usado, manejado por useAuthStorage
        user={user}
        onLogout={logout}
        setShowLoginModal={setShowLoginModal}
        setShowRegisterModal={setShowRegisterModal}
      />

      <main className="min-h-screen">{renderCurrentScreen()}</main>

      <AuthModals
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        showRegisterModal={showRegisterModal}
        setShowRegisterModal={setShowRegisterModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <Footer setCurrentScreen={setCurrentScreen} />
    </div>
  )
}
