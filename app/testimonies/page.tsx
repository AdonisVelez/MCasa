"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Share, Plus, Calendar, User, Send } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

const testimonies = [
  {
    id: 1,
    author: "María González",
    title: "Dios me sanó de una enfermedad terminal",
    content:
      "Hace dos años me diagnosticaron cáncer en etapa avanzada. Los doctores me dieron pocos meses de vida. Pero mi iglesia oró por mí, y después de meses de tratamiento y mucha fe, los exámenes mostraron que no había rastro de la enfermedad. ¡Gloria a Dios por su misericordia!",
    date: "2 de Enero, 2025",
    likes: 45,
    comments: 12,
    category: "Sanidad",
  },
  {
    id: 2,
    author: "Carlos Rodríguez",
    title: "Liberado de las adicciones",
    content:
      "Durante 15 años luché contra la adicción al alcohol. Perdí mi trabajo, mi familia casi se desintegra. Pero cuando llegué a Cristo, Él me dio fuerzas para vencer. Hoy llevo 3 años sobrio y mi familia está restaurada. Solo Dios puede hacer milagros así.",
    date: "28 de Diciembre, 2024",
    likes: 67,
    comments: 23,
    category: "Liberación",
  },
  {
    id: 3,
    author: "Ana Martínez",
    title: "Provisión en tiempos difíciles",
    content:
      "Cuando perdí mi empleo durante la pandemia, no sabía cómo iba a alimentar a mis hijos. Pero Dios proveyó de maneras inesperadas. Hermanos de la iglesia nos ayudaron, conseguí un nuevo trabajo mejor que el anterior. Dios nunca nos abandona.",
    date: "25 de Diciembre, 2024",
    likes: 34,
    comments: 8,
    category: "Provisión",
  },
]

export default function TestimoniesPage() {
  const [showForm, setShowForm] = useState(false)
  const [newTestimony, setNewTestimony] = useState({
    title: "",
    content: "",
    category: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el testimonio
    console.log("Nuevo testimonio:", newTestimony)
    setShowForm(false)
    setNewTestimony({ title: "", content: "", category: "" })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                  <MessageSquare className="h-8 w-8 mr-3 text-green-600" />
                  Testimonios
                </h1>
                <p className="text-gray-600">Comparte cómo Dios ha obrado en tu vida</p>
              </div>
              <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Compartir Testimonio
              </Button>
            </div>
          </div>

          {/* Formulario para nuevo testimonio */}
          {showForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Comparte tu Testimonio</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Título</label>
                    <Input
                      placeholder="Ej: Cómo Dios cambió mi vida..."
                      value={newTestimony.title}
                      onChange={(e) => setNewTestimony({ ...newTestimony, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Categoría</label>
                    <Input
                      placeholder="Ej: Sanidad, Provisión, Liberación..."
                      value={newTestimony.category}
                      onChange={(e) => setNewTestimony({ ...newTestimony, category: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tu Testimonio</label>
                    <Textarea
                      placeholder="Comparte cómo Dios ha obrado en tu vida..."
                      rows={6}
                      value={newTestimony.content}
                      onChange={(e) => setNewTestimony({ ...newTestimony, content: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      <Send className="h-4 w-4 mr-2" />
                      Publicar Testimonio
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Lista de testimonios */}
          <div className="space-y-6">
            {testimonies.map((testimony) => (
              <Card key={testimony.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{testimony.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{testimony.author}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {testimony.date}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">{testimony.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">{testimony.content}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Heart className="h-4 w-4 mr-1" />
                        {testimony.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-600">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {testimony.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-600">
                      <Share className="h-4 w-4 mr-1" />
                      Compartir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botón para cargar más */}
          <div className="text-center mt-8">
            <Button variant="outline">Cargar más testimonios</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
