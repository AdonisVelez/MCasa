"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Share, ImageIcon, Video, ChevronDown, Send, User } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import Image from "next/image"

interface TestimoniosScreenProps {
  userLoggedIn: boolean
  setShowLoginModal: (show: boolean) => void
  user?: any
}

export function TestimoniosScreen({ userLoggedIn, setShowLoginModal, user }: TestimoniosScreenProps) {
  const [newTestimony, setNewTestimony] = useState("")
  const [testimonies, setTestimonies] = useState([
    {
      id: 1,
      author: "Miguel Ángel Pérez",
      date: "Hace 2 días",
      content:
        "Quiero compartir cómo Dios transformó mi vida después de años de adicción. Estaba perdido, pero un día entré a esta iglesia y sentí la presencia de Dios como nunca antes. Hoy, después de 3 años, estoy completamente libre y sirvo en el ministerio de jóvenes. ¡Gloria a Dios!",
      image: "/placeholder.svg?height=256&width=400",
      likes: 24,
      comments: 5,
      avatar: "/placeholder.svg?height=48&width=48",
      liked: false,
      userComments: [
        { user: "Ana García", comment: "¡Qué testimonio tan poderoso! Gloria a Dios.", date: "Hace 1 día" },
        { user: "Carlos López", comment: "Dios es fiel hermano, bendiciones.", date: "Hace 1 día" },
      ],
    },
    {
      id: 2,
      author: "Lucía Hernández",
      date: "Hace 1 semana",
      content:
        "Después de meses orando por mi enfermedad, los médicos no podían creer los resultados de mis últimos exámenes. ¡El cáncer había desaparecido por completo! Este milagro fortaleció mi fe y ahora dedico mi vida a compartir el poder sanador de Dios.",
      likes: 42,
      comments: 8,
      avatar: "/placeholder.svg?height=48&width=48",
      liked: false,
      userComments: [{ user: "Pedro Martín", comment: "¡Aleluya! Dios sigue haciendo milagros.", date: "Hace 5 días" }],
    },
  ])

  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({})

  const handleSubmitTestimony = () => {
    if (newTestimony.trim() && userLoggedIn) {
      const newTestimonyObj = {
        id: Date.now(),
        author: user?.name || "Usuario",
        date: "Ahora",
        content: newTestimony,
        likes: 0,
        comments: 0,
        avatar: user?.avatar || "/placeholder.svg?height=48&width=48",
        liked: false,
        userComments: [],
      }
      setTestimonies([newTestimonyObj, ...testimonies])
      setNewTestimony("")
    }
  }

  const handleLike = (testimonyId: number) => {
    if (!userLoggedIn) {
      setShowLoginModal(true)
      return
    }

    setTestimonies(
      testimonies.map((testimony) =>
        testimony.id === testimonyId
          ? {
              ...testimony,
              liked: !testimony.liked,
              likes: testimony.liked ? testimony.likes - 1 : testimony.likes + 1,
            }
          : testimony,
      ),
    )
  }

  const handleComment = (testimonyId: number) => {
    if (!userLoggedIn) {
      setShowLoginModal(true)
      return
    }

    const comment = newComment[testimonyId]
    if (comment?.trim()) {
      setTestimonies(
        testimonies.map((testimony) =>
          testimony.id === testimonyId
            ? {
                ...testimony,
                comments: testimony.comments + 1,
                userComments: [
                  ...testimony.userComments,
                  {
                    user: user?.name || "Usuario",
                    comment: comment,
                    date: "Ahora",
                  },
                ],
              }
            : testimony,
        ),
      )
      setNewComment({ ...newComment, [testimonyId]: "" })
    }
  }

  const handleShare = async (testimony: any) => {
    const text = `"${testimony.content}" - ${testimony.author} en Casa de Vida`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Testimonio de ${testimony.author}`,
          text: text,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
        navigator.clipboard.writeText(text)
        alert("Testimonio copiado al portapapeles")
      }
    } else {
      navigator.clipboard.writeText(text)
      alert("Testimonio copiado al portapapeles")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
            <MessageSquare className="h-6 w-6 mr-2" />
            Testimonios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AuthGuard
            isAuthenticated={userLoggedIn}
            onLoginClick={() => setShowLoginModal(true)}
            message="Inicia sesión para compartir tu testimonio y interactuar con la comunidad"
            feature="Compartir Testimonio"
          >
            <Card className="bg-blue-50 mb-8">
              <CardContent className="pt-4">
                <h3 className="font-bold text-blue-900 mb-3">Comparte tu Testimonio</h3>
                <Textarea
                  placeholder="Escribe cómo Dios ha obrado en tu vida..."
                  value={newTestimony}
                  onChange={(e) => setNewTestimony(e.target.value)}
                  rows={4}
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Añadir Imagen
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4 mr-2" />
                      Añadir Video
                    </Button>
                  </div>
                  <Button onClick={handleSubmitTestimony} className="bg-blue-900 hover:bg-blue-800">
                    <Send className="h-4 w-4 mr-2" />
                    Publicar Testimonio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AuthGuard>

          <div className="space-y-6">
            {testimonies.map((testimony) => (
              <Card key={testimony.id} className="border-l-4 border-yellow-500">
                <CardContent className="pt-5">
                  <div className="flex items-center mb-4">
                    <Avatar className="mr-3">
                      <AvatarImage src={testimony.avatar || "/placeholder.svg"} alt={testimony.author} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{testimony.author}</h3>
                      <p className="text-sm text-gray-500">{testimony.date}</p>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-700">{testimony.content}</p>

                  {testimony.image && (
                    <div className="mb-4">
                      <Image
                        src={testimony.image || "/placeholder.svg"}
                        alt="Imagen de testimonio"
                        width={400}
                        height={256}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex justify-between items-center text-gray-500 border-t border-gray-100 pt-4">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${testimony.liked ? "text-red-500" : "text-gray-500"} hover:text-red-500`}
                        onClick={() => handleLike(testimony.id)}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${testimony.liked ? "fill-current" : ""}`} />
                        {testimony.likes} Me gusta
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-blue-500"
                        onClick={() =>
                          setShowComments({ ...showComments, [testimony.id]: !showComments[testimony.id] })
                        }
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {testimony.comments} Comentarios
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-blue-500"
                      onClick={() => handleShare(testimony)}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sección de comentarios */}
                  {showComments[testimony.id] && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {/* Comentarios existentes */}
                      <div className="space-y-3 mb-4">
                        {testimony.userComments.map((comment, index) => (
                          <div key={index} className="flex space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs">
                                {comment.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{comment.user}</span>
                                <span className="text-xs text-gray-500">{comment.date}</span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Nuevo comentario */}
                      <AuthGuard
                        isAuthenticated={userLoggedIn}
                        onLoginClick={() => setShowLoginModal(true)}
                        message="Inicia sesión para comentar en este testimonio"
                      >
                        <div className="flex space-x-2">
                          <Input
                            placeholder="Escribe un comentario..."
                            value={newComment[testimony.id] || ""}
                            onChange={(e) => setNewComment({ ...newComment, [testimony.id]: e.target.value })}
                            onKeyPress={(e) => e.key === "Enter" && handleComment(testimony.id)}
                            className="flex-1"
                          />
                          <Button
                            size="icon"
                            onClick={() => handleComment(testimony.id)}
                            className="bg-blue-900 hover:bg-blue-800"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </AuthGuard>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Button className="bg-blue-900 hover:bg-blue-800">
              Cargar más testimonios <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
