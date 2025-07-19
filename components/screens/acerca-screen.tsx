"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Users,
  Heart,
  HandHeart,
  Music,
  PlayIcon as Pray,
  Crown,
} from "lucide-react"
import Image from "next/image"

export function AcercaScreen() {
  const pastors = [
    {
      name: "Pastora Ana María González",
      position: "Pastora Principal",
      description:
        "Con más de 25 años de ministerio, la Pastora Ana María lidera nuestra congregación con sabiduría y amor.",
      image: "/placeholder.svg?height=256&width=256",
    },
    {
      name: "Pastor Miguel Ríos",
      position: "Pastor de Jóvenes",
      description:
        "Apasionado por la juventud, el Pastor Miguel lidera un ministerio dinámico y relevante para la nueva generación.",
      image: "/placeholder.svg?height=256&width=256",
    },
    {
      name: "Pastor Carlos Mendoza",
      position: "Pastor de Familias",
      description:
        "Con un corazón para las familias, el Pastor Carlos ayuda a fortalecer matrimonios y relaciones familiares.",
      image: "/placeholder.svg?height=256&width=256",
    },
  ]

  const ministries = [
    {
      name: "Ministerio de Niños",
      description:
        "Enseñando a los más pequeños sobre el amor de Dios a través de actividades divertidas y lecciones bíblicas.",
      icon: Users,
      color: "bg-blue-100",
    },
    {
      name: "Ministerio de Jóvenes",
      description: "Empoderando a la próxima generación para vivir una fe auténtica y ser líderes en su generación.",
      icon: Heart,
      color: "bg-blue-100",
    },
    {
      name: "Ministerio de Acción Social",
      description:
        "Llevando el amor de Cristo a través de proyectos sociales, ayuda humanitaria y servicio a la comunidad.",
      icon: HandHeart,
      color: "bg-blue-100",
    },
    {
      name: "Ministerio de Alabanza",
      description: "Guiando a la congregación en adoración a través de música y canto que exalta a Dios.",
      icon: Music,
      color: "bg-blue-100",
    },
    {
      name: "Ministerio de Oración",
      description:
        "Intercediendo por las necesidades de la iglesia, la comunidad y el mundo a través de la oración constante.",
      icon: Pray,
      color: "bg-blue-100",
    },
    {
      name: "Ministerio de Matrimonios",
      description: "Fortaleciendo las relaciones matrimoniales con base en principios bíblicos y apoyo práctico.",
      icon: Crown,
      color: "bg-blue-100",
    },
  ]

  const schedules = [
    { day: "Domingo", time: "9:00 AM y 11:00 AM" },
    { day: "Miércoles", time: "7:00 PM (Estudio Bíblico)" },
    { day: "Viernes", time: "7:00 PM (Jóvenes)" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">Acerca de Nosotros</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Somos una comunidad cristiana comprometida a compartir el amor de Cristo y hacer discípulos que
              transformen el mundo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Nuestra Misión</h3>
              <Card className="bg-blue-50 mb-6">
                <CardContent className="pt-6">
                  <p className="text-gray-700">
                    Proclamar el evangelio de Jesucristo, haciendo discípulos que amen a Dios, sirvan a otros y
                    compartan su fe, para la gloria de Dios y la transformación de nuestra comunidad y el mundo.
                  </p>
                </CardContent>
              </Card>

              <h3 className="text-2xl font-bold mb-4 text-blue-900">Nuestra Visión</h3>
              <Card className="bg-blue-50">
                <CardContent className="pt-6">
                  <p className="text-gray-700">
                    Ser una iglesia vibrante y en crecimiento que impacte nuestra ciudad y más allá con el amor y la
                    verdad de Jesucristo, levantando líderes y estableciendo ministerios que transformen vidas para la
                    gloria de Dios.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Image
                src="/placeholder.svg?height=320&width=400"
                alt="Nuestra Iglesia"
                width={400}
                height={320}
                className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
              />
              <div className="grid grid-cols-3 gap-2">
                <Image
                  src="/placeholder.svg?height=96&width=120"
                  alt="Comunidad 1"
                  width={120}
                  height={96}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <Image
                  src="/placeholder.svg?height=96&width=120"
                  alt="Comunidad 2"
                  width={120}
                  height={96}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <Image
                  src="/placeholder.svg?height=96&width=120"
                  alt="Comunidad 3"
                  width={120}
                  height={96}
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Nuestros Pastores</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {pastors.map((pastor, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow">
                  <Image
                    src={pastor.image || "/placeholder.svg"}
                    alt={pastor.name}
                    width={256}
                    height={256}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <CardContent className="pt-4">
                    <h4 className="font-bold text-lg mb-1 text-blue-900">{pastor.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{pastor.position}</p>
                    <p className="text-gray-700 text-sm mb-4">{pastor.description}</p>
                    <div className="flex justify-center space-x-3">
                      <Button variant="ghost" size="icon" className="text-blue-900 hover:text-blue-700">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-blue-900 hover:text-blue-700">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-blue-900 hover:text-blue-700">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Nuestros Ministerios</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministries.map((ministry, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-5">
                    <div className={`${ministry.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <ministry.icon className="h-6 w-6 text-blue-900" />
                    </div>
                    <h4 className="font-bold text-lg mb-2 text-blue-900">{ministry.name}</h4>
                    <p className="text-gray-700 text-sm">{ministry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Nuestra Ubicación</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-600">Mapa interactivo se cargará aquí</p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3 text-blue-900">Horarios de Servicio</h4>
                <div className="space-y-3 mb-6">
                  {schedules.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="font-medium">{schedule.day}</span>
                      <span>{schedule.time}</span>
                    </div>
                  ))}
                </div>

                <h4 className="font-bold text-lg mb-3 text-blue-900">Contacto</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-900 mr-3" />
                    <span>Av. Principal 123, Ciudad</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-900 mr-3" />
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-900 mr-3" />
                    <span>info@casadevida.org</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
