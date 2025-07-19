"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Play, Pause, Search, Heart, Share, Volume2, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import Image from "next/image"

const musicCategories = ["Adoración", "Alabanza", "Contemporáneo", "Tradicional", "Juvenil", "Infantil"]

const songs = [
  {
    id: 1,
    title: "Reckless Love",
    artist: "Cory Asbury",
    album: "Reckless Love",
    duration: "4:23",
    category: "Contemporáneo",
    thumbnail: "/placeholder.svg?height=60&width=60",
    isPlaying: false,
  },
  {
    id: 2,
    title: "Oceans (Where Feet May Fail)",
    artist: "Hillsong United",
    album: "Zion",
    duration: "8:58",
    category: "Adoración",
    thumbnail: "/placeholder.svg?height=60&width=60",
    isPlaying: false,
  },
  {
    id: 3,
    title: "Way Maker",
    artist: "Sinach",
    album: "Way Maker",
    duration: "5:32",
    category: "Alabanza",
    thumbnail: "/placeholder.svg?height=60&width=60",
    isPlaying: true,
  },
  {
    id: 4,
    title: "Goodness of God",
    artist: "Bethel Music",
    album: "Victory",
    duration: "6:15",
    category: "Contemporáneo",
    thumbnail: "/placeholder.svg?height=60&width=60",
    isPlaying: false,
  },
]

const videos = [
  {
    id: 1,
    title: "Amazing Grace (My Chains Are Gone)",
    artist: "Chris Tomlin",
    duration: "4:56",
    views: "2.3M",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 2,
    title: "How Great Is Our God",
    artist: "Chris Tomlin",
    duration: "4:15",
    views: "5.1M",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    title: "10,000 Reasons (Bless the Lord)",
    artist: "Matt Redman",
    duration: "5:33",
    views: "8.7M",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export default function MusicPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [currentSong, setCurrentSong] = useState(songs.find((s) => s.isPlaying))

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Music className="h-8 w-8 mr-3 text-purple-600" />
              Música y Videos Cristianos
            </h1>
            <p className="text-gray-600">Disfruta de la mejor música cristiana para adorar y alabar</p>
          </div>

          {/* Barra de búsqueda y filtros */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar canciones, artistas o álbumes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedCategory === "Todos" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("Todos")}
                  >
                    Todos
                  </Button>
                  {musicCategories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="music" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="music">Música</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>

            <TabsContent value="music" className="space-y-6">
              {/* Reproductor actual */}
              {currentSong && (
                <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={currentSong.thumbnail || "/placeholder.svg"}
                        alt={currentSong.title}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{currentSong.title}</h3>
                        <p className="text-purple-100">{currentSong.artist}</p>
                        <Badge variant="secondary" className="mt-2 bg-white/20 text-white">
                          {currentSong.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Shuffle className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <SkipBack className="h-5 w-5" />
                        </Button>
                        <Button size="icon" className="bg-white text-purple-600 hover:bg-gray-100">
                          <Pause className="h-6 w-6" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <SkipForward className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Repeat className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Lista de canciones */}
              <Card>
                <CardHeader>
                  <CardTitle>Canciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {songs.map((song) => (
                      <div
                        key={song.id}
                        className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors ${
                          song.isPlaying ? "bg-purple-50 border border-purple-200" : ""
                        }`}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className={song.isPlaying ? "text-purple-600" : "text-gray-600"}
                        >
                          {song.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Image
                          src={song.thumbnail || "/placeholder.svg"}
                          alt={song.title}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{song.title}</h4>
                          <p className="text-sm text-gray-600">
                            {song.artist} • {song.album}
                          </p>
                        </div>
                        <Badge variant="outline">{song.category}</Badge>
                        <span className="text-sm text-gray-500">{song.duration}</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500">
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="hover:shadow-md transition-shadow">
                    <div className="relative">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
                        <Button size="icon" className="bg-white/90 text-black hover:bg-white">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">{video.duration}</Badge>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{video.artist}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{video.views} visualizaciones</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500">
                            <Heart className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-500">
                            <Share className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
