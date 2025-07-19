"use client"

import { Button } from "@/components/ui/button"
import { Church, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"

interface FooterProps {
  setCurrentScreen: (screen: string) => void
}

export function Footer({ setCurrentScreen }: FooterProps) {
  const quickLinks = [
    { name: "Inicio", href: "principal" },
    { name: "Biblia", href: "biblia" },
    { name: "Música", href: "musica" },
    { name: "Testimonios", href: "testimonios" },
    { name: "Devocionales", href: "devocionales" },
  ]

  const resources = ["Sermones", "Estudios Bíblicos", "Libros Recomendados", "Preguntas Frecuentes", "Ayuda"]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                <Church className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Casa de Vida</h3>
                <p className="text-blue-200 text-sm">Ministerio Cristiano</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformando vidas con el poder del evangelio y construyendo una comunidad de fe sólida.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <Button
                  key={index}
                  size="icon"
                  variant="ghost"
                  className="bg-white/10 hover:bg-white/20 text-white border-0"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => setCurrentScreen(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold mb-6">Recursos</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Av. Principal 123, Ciudad</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@casadevida.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Dom: 9:00 AM y 11:00 AM</div>
                  <div>Mié: 7:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; 2025 Ministerio Casa de Vida. Todos los derechos reservados. Hecho con ❤️ para la gloria de Dios.
          </p>
        </div>
      </div>
    </footer>
  )
}
