import { type NextRequest, NextResponse } from "next/server"
import { bibleAPI } from "@/lib/bible-api"

export async function GET(request: NextRequest, { params }: { params: { params: string[] } }) {
  try {
    const [action, ...args] = params.params
    const searchParams = request.nextUrl.searchParams
    const version = searchParams.get("version") || "rvr1960"

    switch (action) {
      case "chapter":
        const [book, chapterStr] = args
        const chapter = Number.parseInt(chapterStr)

        if (!book || !chapter) {
          return NextResponse.json({ error: "Book and chapter are required" }, { status: 400 })
        }

        const chapterData = await bibleAPI.getChapter(book, chapter, version)
        if (!chapterData) {
          return NextResponse.json({ error: "Chapter not found" }, { status: 404 })
        }

        return NextResponse.json(chapterData)

      case "verse":
        const [vBook, vChapterStr, vVerseStr] = args
        const vChapter = Number.parseInt(vChapterStr)
        const verse = Number.parseInt(vVerseStr)

        if (!vBook || !vChapter || !verse) {
          return NextResponse.json({ error: "Book, chapter, and verse are required" }, { status: 400 })
        }

        const verseData = await bibleAPI.getVerse(vBook, vChapter, verse, version)
        if (!verseData) {
          return NextResponse.json({ error: "Verse not found" }, { status: 404 })
        }

        return NextResponse.json(verseData)

      case "search":
        const query = searchParams.get("q")
        if (!query) {
          return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
        }

        const searchResults = await bibleAPI.searchVerses(query, version)
        return NextResponse.json({ verses: searchResults })

      case "verse-of-day":
        const verseOfDay = await bibleAPI.getVerseOfTheDay()
        if (!verseOfDay) {
          return NextResponse.json({ error: "Could not fetch verse of the day" }, { status: 500 })
        }

        return NextResponse.json(verseOfDay)

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Bible API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
