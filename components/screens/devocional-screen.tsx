"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, Search, Play, Volume2, ChevronDown } from "lucide-react"
import Image from "next/image"

export function DevocionalScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Todos")

  const filters = ["Todos", "Videos", "Texto", "Audio", "Más recientes"]

  const devotionals = [
    {
      id: 1,
      title: "El Poder de la Oración",
      author: "Pastor Daniel Ramírez",
      ministry: "Ministerio de Enseñanza",
      date: "10 Mayo, 2025",
      type: "VIDEO",
      description:
        "En este devocional, exploramos cómo la oración puede transformar nuestra vida diaria y fortalecer nuestra relación con Dios. Aprende prácticas efectivas para una vida de oración constante.",
      tags: ["Oración", "Vida Espiritual"],
      thumbnail: "/placeholder.svg?height=192&width=300",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Perseverancia en Tiempos Difíciles",
      author: "Pastor Roberto Sánchez",
      ministry: "Ministerio de Consejería",
      date: "5 Mayo, 2025",
      type: "TEXTO",
      description:
        "Un estudio profundo sobre Santiago 1:2-4 y cómo podemos encontrar gozo en medio de las pruebas. Este devocional nos recuerda la importancia de perseverar y confiar en el plan perfecto de Dios.",
      tags: ["Pruebas", "Fe", "Confianza"],
      thumbnail: "/placeholder.svg?height=192&width=300",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "El Propósito Divino para tu Vida",
      author: "Pastora María López",
      ministry: "Ministerio de Mujeres",
      date: "28 Abril, 2025",
      type: "AUDIO",
      description:
        "Descubre cómo Dios tiene un propósito específico para tu vida y cómo puedes descubrirlo. Este devocional en audio te acompañará en tu jornada diaria con enseñanzas prácticas.",
      tags: ["Propósito", "Vocación"],
      duration: "18:24",
      thumbnail: "/placeholder.svg?height=192&width=300",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const series = [
    {
      title: "Familia según Dios",
      description: "Una serie de 5 devocionales sobre los principios bíblicos para construir una familia sólida.",
      episodes: 5,
      duration: "45 min c/u",
      thumbnail: "/placeholder.svg?height=192&width=300",
    },
    {
      title: "Fe en el Trabajo",
      description: "Aprende a integrar tu fe en tu vida laboral con esta serie de 7 devocionales prácticos.",
      episodes: 7,
      duration: "30 min c/u",
      thumbnail: "/placeholder.svg?height=192&width=300",
    },
    {
      title: "21 Días de Oración",
      description: "Fortalece tu vida de oración con esta guía devocional diaria durante 21 días.",
      episodes: 21,
      duration: "15 min c/u",
      thumbnail: "/placeholder.svg?height=192&width=300",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "VIDEO":
        return "bg-blue-900"
      case "TEXTO":
        return "bg-green-600"
      case "AUDIO":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "VIDEO":
        return <Play className="h-4 w-4" />
      case "AUDIO":
        return <Volume2 className="h-4 w-4" />
      default:
        return <Heart className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
            <Heart className="h-6 w-6 mr-2" />
            Devocionales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="relative mb-4 md:mb-0 md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar devocionales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className={selectedFilter === filter ? "bg-blue-900 hover:bg-blue-800" : ""}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {devotionals.map((devotional) => (
              <Card key={devotional.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="relative rounded-lg overflow-hidden">
                        <Image
                          src={devotional.thumbnail || "/placeholder.svg"}
                          alt={devotional.title}
                          width={300}
                          height={192}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Button size="icon" className="bg-white text-blue-900 hover:bg-gray-100 rounded-full">
                            {getTypeIcon(devotional.type)}
                          </Button>
                        </div>
                        <Badge className={`absolute top-2 right-2 text-white text-xs ${getTypeColor(devotional.type)}`}>
                          {devotional.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-blue-900">{devotional.title}</h3>
                        <span className="text-sm text-gray-500">{devotional.date}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{devotional.description}</p>
                      <div className="flex items-center mb-4">
                        <Image
                          src={devotional.avatar || "/placeholder.svg"}
                          alt={devotional.author}
                          width={40}
                          height={40}
                          className="rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-semibold">{devotional.author}</h4>
                          <p className="text-sm text-gray-500">{devotional.ministry}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-3">
                          {devotional.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {devotional.duration ? (
                          <div className="flex items-center text-gray-600 text-sm">
                            <Volume2 className="h-4 w-4 mr-1" />
                            {devotional.duration}
                          </div>
                        ) : (
                          <Button variant="link" className="text-blue-700 hover:text-blue-900 font-medium p-0">
                            {devotional.type === "VIDEO" ? "Ver completo" : "Leer completo"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button className="bg-blue-900 hover:bg-blue-800">
              Cargar más devocionales <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Series de Devocionales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {series.map((serie, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <Image
                  src={serie.thumbnail || "/placeholder.svg"}
                  alt={serie.title}
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardContent className="pt-4">
                  <h3 className="font-bold text-lg mb-1 text-blue-900">{serie.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{serie.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {serie.episodes} episodios • {serie.duration}
                    </span>
                    <Button variant="link" className="text-blue-700 hover:text-blue-900 p-0">
                      Ver serie
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
