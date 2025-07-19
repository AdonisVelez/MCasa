// Configuración centralizada de APIs
export const API_CONFIG = {
  youtube: {
    baseUrl: "https://www.googleapis.com/youtube/v3",
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
    // Canales cristianos verificados
    christianChannels: [
      "UCxJkOPDbLuCKjJJH_GqNs5w", // Hillsong Worship
      "UC6LoFh8VGzONJSF2-7u_kKQ", // Bethel Music
      "UCxJkOPDbLuCKjJJH_GqNs5w", // Jesus Culture
      "UCxJkOPDbLuCKjJJH_GqNs5w", // Elevation Worship
      "UCxJkOPDbLuCKjJJH_GqNs5w", // Passion
      "UCxJkOPDbLuCKjJJH_GqNs5w", // Planetshakers
    ],
    // Términos de búsqueda optimizados para contenido cristiano
    searchFilters: {
      videoCategoryId: "10", // Música
      order: "relevance",
      type: "video",
      safeSearch: "strict",
    },
  },
  spotify: {
    baseUrl: "https://api.spotify.com/v1",
    authUrl: "https://accounts.spotify.com/api/token",
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    // Géneros y artistas cristianos para búsquedas dirigidas
    christianGenres: ["christian", "gospel", "contemporary-christian", "worship"],
    popularArtists: [
      "Hillsong Worship",
      "Bethel Music",
      "Elevation Worship",
      "Chris Tomlin",
      "Lauren Daigle",
      "Casting Crowns",
      "MercyMe",
      "Skillet",
      "For King & Country",
      "Hillsong United",
    ],
  },
  // Configuración para otras APIs cristianas
  christianApis: {
    // API de letras cristianas
    lyricsApi: "https://api.lyrics.ovh/v1",
    // API de iglesias y eventos
    churchApi: "https://api.church.org/v1",
  },
}

// Función para validar configuración de APIs
export function validateApiConfig() {
  const warnings: string[] = []

  if (!API_CONFIG.youtube.apiKey) {
    warnings.push("YouTube API key not configured - video features will use mock data")
  }

  if (!API_CONFIG.spotify.clientId || !API_CONFIG.spotify.clientSecret) {
    warnings.push("Spotify API credentials not configured - music features will use mock data")
  }

  if (warnings.length > 0) {
    console.warn("API Configuration warnings:", warnings)
  }

  return warnings.length === 0
}

// Función para obtener configuración de rate limiting
export function getRateLimits() {
  return {
    youtube: {
      requestsPerDay: 10000,
      requestsPerMinute: 100,
    },
    spotify: {
      requestsPerSecond: 10,
      requestsPerMinute: 600,
    },
  }
}
