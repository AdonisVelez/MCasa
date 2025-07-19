import { type NextRequest, NextResponse } from "next/server"
import { musicAPI } from "@/lib/music-api"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type") || "songs"
    const category = searchParams.get("category") || "worship"
    const query = searchParams.get("q")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    switch (type) {
      case "songs":
        const songs = await musicAPI.getChristianMusic(category, limit)
        return NextResponse.json({ songs })

      case "videos":
        let videos
        if (query) {
          videos = await musicAPI.searchYouTubeVideos(query, limit)
        } else {
          videos = await musicAPI.getPopularChristianVideos()
        }
        return NextResponse.json({ videos })

      case "playlists":
        const playlists = await musicAPI.getChristianPlaylists()
        return NextResponse.json({ playlists })

      default:
        return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
    }
  } catch (error) {
    console.error("Music API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
