"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ZoomIn, ChevronDown } from "lucide-react"
import Image from "next/image"

export function GaleriaScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const categories = ["Todos", "Servicios", "Eventos", "Misiones", "Jóvenes", "Niños"]

  const galleryItems = [
    {
      id: 1,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 1",
      category: "Servicios",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 2",
      category: "Eventos",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 3",
      category: "Jóvenes",
      isVideo: true,
    },
    {
      id: 4,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 4",
      category: "Servicios",
    },
    {
      id: 5,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 5",
      category: "Misiones",
    },
    {
      id: 6,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 6",
      category: "Niños",
    },
    {
      id: 7,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 7",
      category: "Eventos",
    },
    {
      id: 8,
      src: "/placeholder.svg?height=300&width=300",
      alt: "Galería 8",
      category: "Servicios",
    },
  ]

  const albums = [
    {
      title: "Servicios Dominicales",
      photos: 32,
      thumbnail: "/placeholder.svg?height=192&width=300",
    },
    {
      title: "Ministerio de Niños",
      photos: 28,
      thumbnail: "/placeholder.svg?height=192&width=300",
    },
    {
      title: "Misiones 2025",
      photos: 45,
      thumbnail: "/placeholder.svg?height=192&width=300",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Galería</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="relative mb-4 md:mb-0 md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar en la galería..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-blue-900 hover:bg-blue-800" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="relative overflow-hidden rounded-lg group cursor-pointer">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  width={300}
                  height={300}
                  className="w-full h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white" />
                </div>
                {item.isVideo && <Badge className="absolute top-2 right-2 bg-red-600 text-white text-xs">VIDEO</Badge>}
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button className="bg-blue-900 hover:bg-blue-800">
              Cargar más imágenes <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900">Álbumes Destacados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {albums.map((album, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="relative">
                  <Image
                    src={album.thumbnail || "/placeholder.svg"}
                    alt={album.title}
                    width={300}
                    height={192}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end rounded-t-lg">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg">{album.title}</h3>
                      <p className="text-sm">{album.photos} fotos</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
