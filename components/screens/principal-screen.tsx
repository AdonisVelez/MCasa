"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share, ArrowRight, ChevronRight, Quote, Sparkles, TrendingUp, Users, Calendar } from "lucide-react"
import Image from "next/image"

interface PrincipalScreenProps {
  setCurrentScreen: (screen: string) => void
}

export function PrincipalScreen({ setCurrentScreen }: PrincipalScreenProps) {
  const [loading, setLoading] = useState(true)
  const [verse, setVerse] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setVerse(
        "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
      )
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const newsItems = [
    {
      id: 1,
      category: "GLOBAL",
      title: "Miles se reúnen para evento de adoración en Europa",
      excerpt:
        "Un evento masivo de adoración reunió a cristianos de toda Europa para alabar y buscar la renovación espiritual...",
      image: "/placeholder.svg?height=240&width=400",
      date: "Hace 2 días",
      readTime: "3 min",
    },
    {
      id: 2,
      category: "MISIONES",
      title: "Organizaciones cristianas brindan ayuda tras desastre natural",
      excerpt:
        "Varias organizaciones cristianas se han movilizado para proporcionar ayuda de emergencia a las víctimas...",
      image: "/placeholder.svg?height=240&width=400",
      date: "Hace 4 días",
      readTime: "5 min",
    },
    {
      id: 3,
      category: "TESTIMONIOS",
      title: "Historias de fe: Testimonios impactantes de conversión",
      excerpt: "Una serie de testimonios poderosos está inspirando a personas de todo el mundo a acercarse a Cristo...",
      image: "/placeholder.svg?height=240&width=400",
      date: "Hace 1 semana",
      readTime: "4 min",
    },
  ]

  const stats = [
    { icon: Users, label: "Miembros Activos", value: "500+", color: "text-blue-600" },
    { icon: Calendar, label: "Eventos Mensuales", value: "12", color: "text-green-600" },
    { icon: TrendingUp, label: "Crecimiento Anual", value: "25%", color: "text-purple-600" },
    { icon: Sparkles, label: "Testimonios", value: "150+", color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Verse Card */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <Quote className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Versículo del Día</h2>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                      <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-700">
                    <blockquote className="text-xl leading-relaxed text-gray-700 mb-6 italic">"{verse}"</blockquote>
                    <div className="flex items-center justify-between">
                      <cite className="text-blue-600 font-semibold">— Juan 3:16</cite>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Share className="h-4 w-4 mr-2" />
                        Compartir
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Welcome Content */}
            <div className="text-white space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Bienvenido a{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Casa de Vida
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Una comunidad de fe donde experimentarás el amor de Dios, crecerás espiritualmente y encontrarás tu
                propósito divino.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setCurrentScreen("acerca")}
                  className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
                >
                  Conoce Más
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setCurrentScreen("eventos")}
                  className="border-white text-white hover:bg-white hover:text-blue-700"
                >
                  Ver Eventos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Devotional */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Devocional Destacado</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fortalece tu fe con nuestros devocionales diarios llenos de sabiduría bíblica
            </p>
          </div>

          <Card className="max-w-4xl mx-auto shadow-xl border-0 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image src="/placeholder.svg?height=400&width=600" alt="Devocional" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30 mb-2">Destacado</Badge>
                  <h3 className="text-xl font-bold">El Poder de la Oración</h3>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Descubre cómo la oración puede transformar tu vida diaria y fortalecer tu relación con Dios. Una guía
                  práctica para desarrollar una vida de oración efectiva.
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">PD</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Pastor Daniel</div>
                      <div className="text-sm text-gray-500">Ministerio de Enseñanza</div>
                    </div>
                  </div>
                  <Badge variant="secondary">5 min lectura</Badge>
                </div>
                <Button onClick={() => setCurrentScreen("devocionales")} className="bg-blue-600 hover:bg-blue-700">
                  Leer Completo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Noticias Cristianas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mantente informado sobre lo que Dios está haciendo alrededor del mundo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">{item.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{item.date}</span>
                    <span>{item.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
            >
              Ver Más Noticias
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
