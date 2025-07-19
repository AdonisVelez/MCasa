"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Music,
  Play,
  Pause,
  Search,
  Heart,
  Share,
  Volume2,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Loader2,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import type { Song, Video, Playlist } from "@/lib/music-api"

export function MusicaScreen() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("worship")
  const [songs, setSongs] = useState<Song[]>([])
  const [videos, setVideos] = useState<Video[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const categories = ["worship", "praise", "contemporary", "gospel", "hymns"]

  // Cargar música
  const loadMusic = async (category: string = selectedCategory) => {
    setLoading(true)
    try {
      const [songsRes, videosRes, playlistsRes] = await Promise.all([
        fetch(`/api/music?type=songs&category=${category}&limit=20`),
        fetch(`/api/music?type=videos&limit=12`),
        fetch(`/api/music?type=playlists`),
      ])

      if (songsRes.ok) {
        const songsData = await songsRes.json()
        setSongs(songsData.songs || [])
      }

      if (videosRes.ok) {
        const videosData = await videosRes.json()
        setVideos(videosData.videos || [])
      }

      if (playlistsRes.ok) {
        const playlistsData = await playlistsRes.json()
        setPlaylists(playlistsData.playlists || [])
      }
    } catch (error) {
      console.error("Error loading music:", error)
    } finally {
      setLoading(false)
    }
  }

  // Buscar música
  const searchMusic = async () => {
    if (!searchTerm.trim()) return

    setSearching(true)
    try {
      const response = await fetch(`/api/music?type=videos&q=${encodeURIComponent(searchTerm)}&limit=15`)
      if (response.ok) {
        const data = await response.json()
        setVideos(data.videos || [])
      }
    } catch (error) {
      console.error("Error searching music:", error)
    } finally {
      setSearching(false)
    }
  }

  const playSong = (song: Song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    loadMusic()
  }, [])

  useEffect(() => {
    loadMusic(selectedCategory)
  }, [selectedCategory])

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      worship: "Adoración",
      praise: "Alabanza",
      contemporary: "Contemporáneo",
      gospel: "Gospel",
      hymns: "Himnos",
    }
    return names[category] || category
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Música & Videos Cristianos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Disfruta de la mejor música cristiana para adorar y alabar a Dios
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-xl border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar canciones, artistas o álbumes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchMusic()}
                  className="pl-10"
                />
                <Button
                  size="sm"
                  onClick={searchMusic}
                  disabled={searching}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700"
                >
                  {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {getCategoryName(category)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Player */}
        {currentSong && (
          <Card className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Image
                    src={currentSong.thumbnail || "/placeholder.svg"}
                    alt={currentSong.title}
                    width={80}
                    height={80}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{currentSong.title}</h3>
                  <p className="text-purple-100 mb-2">{currentSong.artist}</p>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {getCategoryName(currentSong.category)}
                    </Badge>
                    <span className="text-purple-200 text-sm">{currentSong.duration}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Shuffle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={togglePlayPause}
                    className="bg-white text-purple-600 hover:bg-gray-100 w-12 h-12"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
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

        <Tabs defaultValue="music" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
            <TabsTrigger value="music" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Música
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Videos
            </TabsTrigger>
            <TabsTrigger value="playlists" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Listas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="space-y-6">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="shadow-lg border-0">
                    <div className="p-4">
                      <Skeleton className="w-full h-48 rounded-lg mb-4" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {songs.map((song) => (
                  <Card key={song.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <div className="relative overflow-hidden">
                      <Image
                        src={song.thumbnail || "/placeholder.svg"}
                        alt={song.title}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="icon"
                          onClick={() => playSong(song)}
                          className="bg-white text-purple-600 hover:bg-gray-100 rounded-full w-16 h-16"
                        >
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
                        {getCategoryName(song.category)}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{song.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{song.artist}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{song.duration}</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 h-8 w-8">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500 h-8 w-8">
                            <Share className="h-4 w-4" />
                          </Button>
                          {song.source !== "local" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-gray-400 hover:text-purple-500 h-8 w-8"
                              onClick={() => window.open(song.url, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="shadow-lg border-0">
                    <Skeleton className="w-full h-48 rounded-t-lg" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2 mb-2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                    <div className="relative overflow-hidden">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="icon"
                          onClick={() => window.open(video.url, "_blank")}
                          className="bg-white text-purple-600 hover:bg-gray-100 rounded-full w-16 h-16"
                        >
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                      <Badge className="absolute bottom-3 right-3 bg-red-600 text-white">{video.duration}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{video.artist}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{video.views} visualizaciones</span>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 h-8 w-8">
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500 h-8 w-8">
                            <Share className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-purple-500 h-8 w-8"
                            onClick={() => window.open(video.url, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="playlists" className="space-y-6">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="shadow-lg border-0">
                    <Skeleton className="w-full h-48 rounded-t-lg" />
                    <div className="p-4">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map((playlist) => (
                  <Card
                    key={playlist.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={playlist.thumbnail || "/placeholder.svg"}
                        alt={playlist.name}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-bold text-lg mb-2">{playlist.name}</h3>
                        <p className="text-purple-100 text-sm mb-2 line-clamp-2">{playlist.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-200 text-sm">{playlist.songCount} canciones</span>
                          <Button
                            size="icon"
                            className="bg-yellow-500 text-purple-900 hover:bg-yellow-400 rounded-full"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
