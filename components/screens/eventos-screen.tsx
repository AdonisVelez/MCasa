"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, MapPin, ChevronDown, Calendar, Users, Share, Heart } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import Image from "next/image"

interface EventosScreenProps {
  setShowEventModal: (show: boolean) => void
  setCurrentEvent: (event: any) => void
  userLoggedIn: boolean
  setShowLoginModal: (show: boolean) => void
}

export function EventosScreen({
  setShowEventModal,
  setCurrentEvent,
  userLoggedIn,
  setShowLoginModal,
}: EventosScreenProps) {
  const [showEventDetail, setShowEventDetail] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [attendingEvents, setAttendingEvents] = useState<number[]>([])
  const [interestedEvents, setInterestedEvents] = useState<number[]>([])

  const upcomingEvents = [
    {
      id: 1,
      title: "Conferencia de Jóvenes",
      date: "15 Junio, 2025",
      time: "17:00 - 21:00",
      location: "Auditorio Principal",
      description:
        "Una noche especial para jóvenes con música, predicación y actividades para fortalecer la fe y crear comunidad.",
      image: "/placeholder.svg?height=192&width=300",
      images: [
        "/placeholder.svg?height=192&width=300",
        "/placeholder.svg?height=192&width=300",
        "/placeholder.svg?height=192&width=300",
      ],
      attendees: 45,
      maxAttendees: 100,
      price: "Gratis",
      organizer: "Ministerio de Jóvenes",
      tags: ["Jóvenes", "Música", "Predicación"],
    },
    {
      id: 2,
      title: "Retiro Familiar",
      date: "22-24 Julio, 2025",
      time: "Todo el día",
      location: "Centro de Retiros Vida Nueva",
      description:
        "Un fin de semana para fortalecer los lazos familiares a través de talleres, actividades recreativas y momentos de adoración juntos.",
      image: "/placeholder.svg?height=192&width=300",
      images: ["/placeholder.svg?height=192&width=300", "/placeholder.svg?height=192&width=300"],
      attendees: 28,
      maxAttendees: 50,
      price: "$150 por familia",
      organizer: "Ministerio de Familias",
      tags: ["Familias", "Retiro", "Talleres"],
    },
    {
      id: 3,
      title: "Concierto de Alabanza",
      date: "5 Agosto, 2025",
      time: "19:00 - 22:00",
      location: "Plaza Central",
      description:
        "Una noche de adoración bajo las estrellas con bandas cristianas locales e invitados especiales. Evento gratuito y abierto a toda la comunidad.",
      image: "/placeholder.svg?height=192&width=300",
      images: ["/placeholder.svg?height=192&width=300", "/placeholder.svg?height=192&width=300"],
      attendees: 120,
      maxAttendees: 200,
      price: "Gratis",
      organizer: "Ministerio de Alabanza",
      tags: ["Música", "Comunidad", "Adoración"],
    },
  ]

  const pastEvents = [
    {
      id: 4,
      title: "Semana de Oración",
      date: "10-15 Abril, 2025",
      time: "20:00 - 21:30",
      location: "Templo Principal",
      description:
        "Una semana dedicada a la oración por la ciudad, las familias y el avivamiento espiritual. Cada noche tuvo un enfoque temático diferente.",
      images: [
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
        "/placeholder.svg?height=80&width=80",
      ],
      attendees: 85,
    },
    {
      id: 5,
      title: "Campaña Evangelística",
      date: "20-22 Marzo, 2025",
      time: "19:00 - 21:00",
      location: "Estadio Municipal",
      description:
        "Tres noches de predicación del evangelio con el evangelista internacional Juan Gómez. Cientos de personas entregaron su vida a Cristo durante este evento.",
      images: ["/placeholder.svg?height=80&width=80", "/placeholder.svg?height=80&width=80"],
      attendees: 350,
    },
  ]

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setShowEventDetail(true)
  }

  const handleAttendEvent = (eventId: number) => {
    if (!userLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (attendingEvents.includes(eventId)) {
      setAttendingEvents(attendingEvents.filter((id) => id !== eventId))
    } else {
      setAttendingEvents([...attendingEvents, eventId])
      // Remover de interesados si estaba ahí
      setInterestedEvents(interestedEvents.filter((id) => id !== eventId))
    }
  }

  const handleInterestedEvent = (eventId: number) => {
    if (!userLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (interestedEvents.includes(eventId)) {
      setInterestedEvents(interestedEvents.filter((id) => id !== eventId))
    } else {
      setInterestedEvents([...interestedEvents, eventId])
      // Remover de asistentes si estaba ahí
      setAttendingEvents(attendingEvents.filter((id) => id !== eventId))
    }
  }

  const handleShareEvent = async (event: any) => {
    const text = `¡Te invito al evento "${event.title}" el ${event.date} en ${event.location}!`

    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: text,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
        navigator.clipboard.writeText(text)
        alert("Evento copiado al portapapeles")
      }
    } else {
      navigator.clipboard.writeText(text)
      alert("Evento copiado al portapapeles")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={192}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-blue-900 text-white">{event.date.split(",")[0]}</Badge>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleShareEvent(event)
                      }}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg mb-1 text-blue-900">{event.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {event.attendees}/{event.maxAttendees} asistentes
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">{event.price}</span>
                    <Button onClick={() => handleEventClick(event)} size="sm" className="bg-blue-900 hover:bg-blue-800">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Eventos Pasados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="pl-8 relative">
            <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-yellow-500"></div>

            {pastEvents.map((event, index) => (
              <div key={event.id} className="pl-8 pb-10 relative">
                <div className="absolute left-[-8px] top-5 w-4 h-4 rounded-full bg-blue-900 border-3 border-yellow-500"></div>
                <span className="text-sm font-bold text-blue-900 mb-2 block">{event.date}</span>
                <Card>
                  <CardContent className="pt-4">
                    <h3 className="font-bold text-lg mb-2 text-blue-900">{event.title}</h3>
                    <p className="text-gray-700 text-sm mb-4">{event.description}</p>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees} asistentes</span>
                    </div>
                    <div className="flex overflow-x-auto space-x-2 mb-4">
                      {event.images.map((img, imgIndex) => (
                        <Image
                          key={imgIndex}
                          src={img || "/placeholder.svg"}
                          alt={`Imagen ${imgIndex + 1}`}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                      ))}
                    </div>
                    <Button
                      variant="link"
                      onClick={() => handleEventClick(event)}
                      className="text-blue-700 hover:text-blue-900 font-medium p-0"
                    >
                      Ver galería completa
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}

            <div className="flex justify-center">
              <Button className="bg-blue-900 hover:bg-blue-800">
                Ver más eventos pasados <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de detalles del evento */}
      <Dialog open={showEventDetail} onOpenChange={setShowEventDetail}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-blue-900">{selectedEvent.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <Image
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    <span>
                      {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Descripción</h4>
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Organizador</h4>
                  <p className="text-gray-700">{selectedEvent.organizer}</p>
                </div>

                <div>
                  <h4 className="font-bold mb-2">Precio</h4>
                  <p className="text-green-600 font-medium">{selectedEvent.price}</p>
                </div>

                {selectedEvent.tags && (
                  <div>
                    <h4 className="font-bold mb-2">Categorías</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Solo mostrar botones de acción para eventos futuros */}
                {selectedEvent.id <= 3 && (
                  <div className="flex space-x-3">
                    <AuthGuard
                      isAuthenticated={userLoggedIn}
                      onLoginClick={() => setShowLoginModal(true)}
                      message="Inicia sesión para confirmar tu asistencia a eventos"
                    >
                      <Button
                        onClick={() => handleAttendEvent(selectedEvent.id)}
                        className={`flex-1 ${
                          attendingEvents.includes(selectedEvent.id)
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                      >
                        {attendingEvents.includes(selectedEvent.id) ? "✓ Asistiré" : "Confirmar Asistencia"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleInterestedEvent(selectedEvent.id)}
                        className={`flex-1 ${
                          interestedEvents.includes(selectedEvent.id) ? "border-yellow-500 text-yellow-600" : ""
                        }`}
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${interestedEvents.includes(selectedEvent.id) ? "fill-current" : ""}`}
                        />
                        {interestedEvents.includes(selectedEvent.id) ? "Me interesa" : "Interesado"}
                      </Button>
                    </AuthGuard>
                  </div>
                )}

                <Button variant="outline" onClick={() => handleShareEvent(selectedEvent)} className="w-full">
                  <Share className="h-4 w-4 mr-2" />
                  Compartir Evento
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
