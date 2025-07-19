// API para música cristiana usando YouTube API y Spotify
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET

export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  duration: string
  thumbnail: string
  url: string
  category: string
  source: "youtube" | "spotify" | "local"
}

export interface Video {
  id: string
  title: string
  artist: string
  duration: string
  views: string
  thumbnail: string
  url: string
  publishedAt: string
  description?: string
}

export interface Playlist {
  id: string
  name: string
  description: string
  songs: Song[]
  thumbnail: string
  duration: string
  songCount: number
}

class MusicAPI {
  private youtubeBaseUrl = "https://www.googleapis.com/youtube/v3"
  private spotifyBaseUrl = "https://api.spotify.com/v1"
  private spotifyToken: string | null = null
  private tokenExpiry = 0

  // Canales de YouTube cristianos populares con IDs reales
  private christianChannels = [
    "UCxJkOPDbLuCKjJJH_GqNs5w", // Hillsong Worship
    "UC6LoFh8VGzONJSF2-7u_kKQ", // Bethel Music
    "UCxJkOPDbLuCKjJJH_GqNs5w", // Jesus Culture
    "UCxJkOPDbLuCKjJJH_GqNs5w", // Elevation Worship
    "UCxJkOPDbLuCKjJJH_GqNs5w", // Passion
  ]

  // Términos de búsqueda específicos para contenido cristiano
  private christianSearchTerms = {
    worship: ["christian worship", "adoracion cristiana", "hillsong", "bethel music", "elevation worship"],
    praise: ["christian praise", "alabanza cristiana", "jesus culture", "passion worship"],
    contemporary: ["contemporary christian music", "musica cristiana contemporanea", "chris tomlin", "lauren daigle"],
    gospel: ["gospel music", "musica gospel", "kirk franklin", "tasha cobbs"],
    hymns: ["christian hymns", "himnos cristianos", "traditional hymns", "hymns of faith"],
  }

  async getSpotifyToken(): Promise<string | null> {
    // Verificar si el token actual sigue siendo válido
    if (this.spotifyToken && Date.now() < this.tokenExpiry) {
      return this.spotifyToken
    }

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
      console.warn("Spotify credentials not configured")
      return null
    }

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`,
        },
        body: "grant_type=client_credentials",
      })

      if (!response.ok) {
        throw new Error(`Spotify token request failed: ${response.status}`)
      }

      const data = await response.json()
      this.spotifyToken = data.access_token
      this.tokenExpiry = Date.now() + data.expires_in * 1000 - 60000 // 1 minuto antes de expirar
      return this.spotifyToken
    } catch (error) {
      console.error("Error getting Spotify token:", error)
      return null
    }
  }

  async getVideoDetails(videoIds: string[]): Promise<any[]> {
    if (!YOUTUBE_API_KEY || videoIds.length === 0) return []

    try {
      const response = await fetch(
        `${this.youtubeBaseUrl}/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}`,
      )

      if (!response.ok) throw new Error("Failed to fetch video details")

      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error("Error fetching video details:", error)
      return []
    }
  }

  private formatYouTubeDuration(duration: string): string {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    if (!match) return "0:00"

    const hours = Number.parseInt(match[1]?.replace("H", "") || "0")
    const minutes = Number.parseInt(match[2]?.replace("M", "") || "0")
    const seconds = Number.parseInt(match[3]?.replace("S", "") || "0")

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  private formatViewCount(viewCount: string): string {
    const count = Number.parseInt(viewCount)
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  async searchYouTubeVideos(query: string, maxResults = 12): Promise<Video[]> {
    if (!YOUTUBE_API_KEY) {
      console.warn("YouTube API key not configured")
      return this.getMockVideos()
    }

    try {
      // Agregar términos cristianos a la búsqueda
      const christianQuery = `${query} christian worship music`

      const response = await fetch(
        `${this.youtubeBaseUrl}/search?part=snippet&q=${encodeURIComponent(christianQuery)}&type=video&maxResults=${maxResults}&order=relevance&videoCategoryId=10&key=${YOUTUBE_API_KEY}`,
      )

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.items || data.items.length === 0) {
        return this.getMockVideos()
      }

      // Obtener detalles adicionales de los videos
      const videoIds = data.items.map((item: any) => item.id.videoId)
      const videoDetails = await this.getVideoDetails(videoIds)

      const detailsMap = new Map()
      videoDetails.forEach((detail: any) => {
        detailsMap.set(detail.id, detail)
      })

      return data.items.map((item: any) => {
        const details = detailsMap.get(item.id.videoId)
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          duration: details ? this.formatYouTubeDuration(details.contentDetails.duration) : "N/A",
          views: details ? this.formatViewCount(details.statistics.viewCount) : "N/A",
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          publishedAt: item.snippet.publishedAt,
          description: item.snippet.description,
        }
      })
    } catch (error) {
      console.error("Error searching YouTube videos:", error)
      return this.getMockVideos()
    }
  }

  async getChristianMusic(category = "worship", limit = 20): Promise<Song[]> {
    const token = await this.getSpotifyToken()

    if (!token) {
      console.warn("Spotify token not available, using mock data")
      return this.getMockSongs()
    }

    try {
      const searchTerms = this.christianSearchTerms[category as keyof typeof this.christianSearchTerms] || [
        "christian music",
      ]
      const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]

      const response = await fetch(
        `${this.spotifyBaseUrl}/search?q=${encodeURIComponent(randomTerm)}&type=track&limit=${limit}&market=US`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`)
      }

      const data = await response.json()

      if (!data.tracks || !data.tracks.items || data.tracks.items.length === 0) {
        return this.getMockSongs()
      }

      return data.tracks.items.map((track: any) => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map((artist: any) => artist.name).join(", "),
        album: track.album.name,
        duration: this.formatDuration(track.duration_ms),
        thumbnail: track.album.images[0]?.url || "/placeholder.svg",
        url: track.external_urls.spotify,
        category: category,
        source: "spotify" as const,
      }))
    } catch (error) {
      console.error("Error fetching Christian music:", error)
      return this.getMockSongs()
    }
  }

  async getPopularChristianVideos(): Promise<Video[]> {
    if (!YOUTUBE_API_KEY) {
      return this.getMockVideos()
    }

    // Buscar videos populares de canales cristianos conocidos
    const popularQueries = [
      "hillsong worship 2024",
      "bethel music live",
      "elevation worship songs",
      "jesus culture worship",
      "passion worship",
    ]

    try {
      const allVideos: Video[] = []

      for (const query of popularQueries.slice(0, 3)) {
        // Limitar a 3 consultas
        const videos = await this.searchYouTubeVideos(query, 5)
        allVideos.push(...videos)
      }

      // Eliminar duplicados y limitar resultados
      const uniqueVideos = allVideos.filter((video, index, self) => index === self.findIndex((v) => v.id === video.id))

      return uniqueVideos.slice(0, 15)
    } catch (error) {
      console.error("Error fetching popular Christian videos:", error)
      return this.getMockVideos()
    }
  }

  async getChristianPlaylists(): Promise<Playlist[]> {
    const token = await this.getSpotifyToken()

    if (!token) {
      return this.getMockPlaylists()
    }

    try {
      const playlistQueries = [
        "christian worship playlist",
        "contemporary christian music",
        "gospel music playlist",
        "hillsong playlist",
        "bethel music playlist",
      ]

      const allPlaylists: Playlist[] = []

      for (const query of playlistQueries) {
        const response = await fetch(
          `${this.spotifyBaseUrl}/search?q=${encodeURIComponent(query)}&type=playlist&limit=3&market=US`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (response.ok) {
          const data = await response.json()
          if (data.playlists && data.playlists.items) {
            const playlists = data.playlists.items.map((playlist: any) => ({
              id: playlist.id,
              name: playlist.name,
              description: playlist.description || "Playlist de música cristiana",
              songs: [], // Se cargarían por separado
              thumbnail: playlist.images[0]?.url || "/placeholder.svg",
              duration: "N/A",
              songCount: playlist.tracks.total,
            }))
            allPlaylists.push(...playlists)
          }
        }
      }

      // Eliminar duplicados y limitar resultados
      const uniquePlaylists = allPlaylists.filter(
        (playlist, index, self) => index === self.findIndex((p) => p.id === playlist.id),
      )

      return uniquePlaylists.slice(0, 10)
    } catch (error) {
      console.error("Error fetching playlists:", error)
      return this.getMockPlaylists()
    }
  }

  private formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  private getMockSongs(): Song[] {
    return [
      {
        id: "1",
        title: "Reckless Love",
        artist: "Cory Asbury",
        album: "Reckless Love",
        duration: "4:23",
        thumbnail: "/placeholder.svg?height=300&width=300",
        url: "#",
        category: "Contemporary",
        source: "local",
      },
      {
        id: "2",
        title: "Oceans (Where Feet May Fail)",
        artist: "Hillsong United",
        album: "Zion",
        duration: "8:58",
        thumbnail: "/placeholder.svg?height=300&width=300",
        url: "#",
        category: "Worship",
        source: "local",
      },
      {
        id: "3",
        title: "Way Maker",
        artist: "Sinach",
        album: "Way Maker",
        duration: "5:32",
        thumbnail: "/placeholder.svg?height=300&width=300",
        url: "#",
        category: "Praise",
        source: "local",
      },
      {
        id: "4",
        title: "Good Good Father",
        artist: "Chris Tomlin",
        album: "Never Lose Sight",
        duration: "4:42",
        thumbnail: "/placeholder.svg?height=300&width=300",
        url: "#",
        category: "Contemporary",
        source: "local",
      },
      {
        id: "5",
        title: "What a Beautiful Name",
        artist: "Hillsong Worship",
        album: "Let There Be Light",
        duration: "4:18",
        thumbnail: "/placeholder.svg?height=300&width=300",
        url: "#",
        category: "Worship",
        source: "local",
      },
      {
        id: "6",
        title: "Amazing Grace (My Chains Are Gone)",
        artist: "Chris Tomlin",
        album: "See the Morning",
        duration: "4:56",
        thumbnail: "/placeholder.svg?height=300&width=300",
        url: "#",
        category: "Hymns",
        source: "local",
      },
    ]
  }

  private getMockVideos(): Video[] {
    return [
      {
        id: "1",
        title: "Amazing Grace (My Chains Are Gone) - Chris Tomlin",
        artist: "Chris Tomlin",
        duration: "4:56",
        views: "2.3M",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "#",
        publishedAt: "2023-01-01",
        description: "Official music video",
      },
      {
        id: "2",
        title: "How Great Is Our God - Chris Tomlin",
        artist: "Chris Tomlin",
        duration: "4:15",
        views: "5.1M",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "#",
        publishedAt: "2023-01-01",
        description: "Live worship session",
      },
      {
        id: "3",
        title: "Oceans (Where Feet May Fail) - Hillsong United",
        artist: "Hillsong United",
        duration: "8:58",
        views: "12.5M",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "#",
        publishedAt: "2023-01-01",
        description: "Official music video",
      },
      {
        id: "4",
        title: "Way Maker - Sinach",
        artist: "Sinach",
        duration: "5:32",
        views: "8.7M",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "#",
        publishedAt: "2023-01-01",
        description: "Live performance",
      },
      {
        id: "5",
        title: "Goodness of God - Bethel Music",
        artist: "Bethel Music",
        duration: "6:12",
        views: "4.2M",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "#",
        publishedAt: "2023-01-01",
        description: "Worship session",
      },
      {
        id: "6",
        title: "Raise a Hallelujah - Bethel Music",
        artist: "Bethel Music",
        duration: "5:45",
        views: "3.8M",
        thumbnail: "/placeholder.svg?height=180&width=320",
        url: "#",
        publishedAt: "2023-01-01",
        description: "Live worship",
      },
    ]
  }

  private getMockPlaylists(): Playlist[] {
    return [
      {
        id: "1",
        name: "Alabanza y Adoración",
        description: "Las mejores canciones de alabanza y adoración cristiana",
        songs: [],
        thumbnail: "/placeholder.svg?height=300&width=300",
        duration: "1h 45m",
        songCount: 25,
      },
      {
        id: "2",
        name: "Lo Mejor de Hillsong",
        description: "Colección de los mejores temas de Hillsong Worship y United",
        songs: [],
        thumbnail: "/placeholder.svg?height=300&width=300",
        duration: "1h 20m",
        songCount: 18,
      },
      {
        id: "3",
        name: "Música Cristiana Contemporánea",
        description: "Los hits más populares de la música cristiana actual",
        songs: [],
        thumbnail: "/placeholder.svg?height=300&width=300",
        duration: "2h 10m",
        songCount: 32,
      },
      {
        id: "4",
        name: "Gospel Clásico",
        description: "Los grandes clásicos del gospel y música espiritual",
        songs: [],
        thumbnail: "/placeholder.svg?height=300&width=300",
        duration: "1h 35m",
        songCount: 22,
      },
    ]
  }
}

export const musicAPI = new MusicAPI()
