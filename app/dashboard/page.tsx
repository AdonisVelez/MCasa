"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, Music, MessageSquare, Calendar, Users, Heart, Play, Quote, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  const [verseOfDay] = useState({
    verse:
      "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
    reference: "Jeremías 29:11",
    version: "RVR1960",
  })

  const [latestDevotional] = useState({
    title: "La Fidelidad de Dios en Tiempos Difíciles",
    author: "Pastor Juan Martínez",
    date: "4 de Enero, 2025",
    excerpt: "En medio de las tormentas de la vida, podemos confiar en que Dios permanece fiel a sus promesas...",
    duration: "5 min",
  })

  const [upcomingEvents] = useState([
    {
      title: "Culto de Oración",
      date: "Miércoles 8 de Enero",
      time: "7:00 PM",
      location: "Santuario Principal",
    },
    {
      title: "Escuela Dominical",
      date: "Domingo 12 de Enero",
      time: "9:00 AM",
      location: "Aulas de Educación",
    },
  ])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido de vuelta!</h1>
            <p className="text-gray-600">Que la paz de Cristo esté contigo hoy</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Versículo del Día */}
            <Card className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Quote className="h-5 w-5 mr-2" />
                    Versículo del Día
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {verseOfDay.version}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="text-lg mb-4 italic">"{verseOfDay.verse}"</blockquote>
                <cite className="text-blue-100 font-medium">- {verseOfDay.reference}</cite>
              </CardContent>
            </Card>

            {/* Acceso Rápido */}
            <Card>
              <CardHeader>
                <CardTitle>Acceso Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/bible">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Book className="h-4 w-4 mr-2" />
                    Leer la Biblia
                  </Button>
                </Link>
                <Link href="/testimonies">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Compartir Testimonio
                  </Button>
                </Link>
                <Link href="/music">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Music className="h-4 w-4 mr-2" />
                    Música Cristiana
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Último Devocional */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Devocional Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{latestDevotional.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span>{latestDevotional.author}</span>
                    <span>•</span>
                    <span>{latestDevotional.date}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {latestDevotional.duration}
                    </div>
                  </div>
                  <p className="text-gray-700">{latestDevotional.excerpt}</p>
                  <Link href="/devotionals">
                    <Button size="sm" className="mt-3">
                      <Play className="h-4 w-4 mr-2" />
                      Leer Completo
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Próximos Eventos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-500" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">{event.title}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {event.date} - {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link href="/events">
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                      Ver Todos los Eventos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Estadísticas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Book className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">66</div>
                <p className="text-sm text-gray-600">Libros Bíblicos</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Music className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">150+</div>
                <p className="text-sm text-gray-600">Canciones</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">25</div>
                <p className="text-sm text-gray-600">Testimonios</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold">500+</div>
                <p className="text-sm text-gray-600">Miembros</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
