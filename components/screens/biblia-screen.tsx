"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Book, Bookmark, Share, Search, Heart, Star, Settings, Volume2, Loader2 } from "lucide-react"
import { BIBLE_BOOKS, BIBLE_VERSIONS, type BibleChapter, type BibleVerse } from "@/lib/bible-api"
import { BibleTrivia } from "@/components/bible-trivia"
import { useBibleStorage } from "@/hooks/use-bible-storage"

export function BibliaScreen() {
  const [selectedVersion, setSelectedVersion] = useState("rvr1960")
  const [selectedBook, setSelectedBook] = useState("john")
  const [selectedChapter, setSelectedChapter] = useState("3")
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<BibleVerse[]>([])
  const [searching, setSearching] = useState(false)
  const [verseOfDay, setVerseOfDay] = useState<BibleVerse | null>(null)
  const [globalSearchQuery, setGlobalSearchQuery] = useState("")
  const [selectedVerse, setSelectedVerse] = useState("")

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    readingPlan,
    initializeReadingPlan,
    markDayAsRead,
    getReadingProgress,
    getTodaysReading,
    favoriteBooks,
    addFavoriteBook,
    removeFavoriteBook,
    shareVerse,
  } = useBibleStorage()

  const selectedBookData = BIBLE_BOOKS.find((book) => book.id === selectedBook)
  const maxChapters = selectedBookData?.chapters || 1

  // Cargar capítulo
  const loadChapter = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/bible/chapter/${selectedBook}/${selectedChapter}?version=${selectedVersion}`)
      if (response.ok) {
        const data = await response.json()
        setChapterData(data)
      } else {
        console.error("Failed to load chapter")
        // Fallback a datos mock si la API falla
        setChapterData({
          reference: `${selectedBookData?.name} ${selectedChapter}`,
          verses: [
            {
              book_id: selectedBook,
              book_name: selectedBookData?.name || "",
              chapter: Number.parseInt(selectedChapter),
              verse: 16,
              text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
            },
            {
              book_id: selectedBook,
              book_name: selectedBookData?.name || "",
              chapter: Number.parseInt(selectedChapter),
              verse: 17,
              text: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.",
            },
          ],
          text: "",
          translation_id: selectedVersion,
          translation_name: BIBLE_VERSIONS.find((v) => v.id === selectedVersion)?.name || selectedVersion,
          translation_note: "",
        })
      }
    } catch (error) {
      console.error("Error loading chapter:", error)
    } finally {
      setLoading(false)
    }
  }

  // Buscar versículos
  const searchVerses = async () => {
    if (!globalSearchQuery.trim()) return

    setSearching(true)
    try {
      const response = await fetch(
        `/api/bible/search?q=${encodeURIComponent(globalSearchQuery)}&version=${selectedVersion}`,
      )
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.verses || [])
      }
    } catch (error) {
      console.error("Error searching verses:", error)
    } finally {
      setSearching(false)
    }
  }

  // Cargar versículo del día
  const loadVerseOfDay = async () => {
    try {
      const response = await fetch("/api/bible/verse-of-day")
      if (response.ok) {
        const data = await response.json()
        setVerseOfDay(data)
      }
    } catch (error) {
      console.error("Error loading verse of the day:", error)
    }
  }

  useEffect(() => {
    loadChapter()
    setSelectedVerse("") // Resetear versículo seleccionado al cambiar capítulo
  }, [selectedBook, selectedChapter, selectedVersion])

  useEffect(() => {
    loadVerseOfDay()
  }, [])

  const goToVerse = () => {
    if (!searchQuery.trim()) return

    // Parsear entrada: puede ser "16" o "3:16"
    const input = searchQuery.trim()

    if (input.includes(":")) {
      // Formato "capítulo:versículo"
      const [chapterStr, verseStr] = input.split(":")
      const chapter = Number.parseInt(chapterStr)
      const verse = Number.parseInt(verseStr)

      if (chapter && verse) {
        setSelectedChapter(chapter.toString())
        // Después de cargar el capítulo, hacer scroll al versículo
        setTimeout(() => {
          const verseElement = document.getElementById(`verse-${verse}`)
          if (verseElement) {
            verseElement.scrollIntoView({ behavior: "smooth", block: "center" })
            verseElement.classList.add("bg-yellow-200", "border-yellow-500", "border-2")
            setTimeout(() => {
              verseElement.classList.remove("bg-yellow-200", "border-yellow-500", "border-2")
            }, 3000)
          }
        }, 500)
      }
    } else {
      // Solo número de versículo en el capítulo actual
      const verse = Number.parseInt(input)
      if (verse) {
        setTimeout(() => {
          const verseElement = document.getElementById(`verse-${verse}`)
          if (verseElement) {
            verseElement.scrollIntoView({ behavior: "smooth", block: "center" })
            verseElement.classList.add("bg-yellow-200", "border-yellow-500", "border-2")
            setTimeout(() => {
              verseElement.classList.remove("bg-yellow-200", "border-yellow-500", "border-2")
            }, 3000)
          }
        }, 100)
      }
    }

    setSearchQuery("")
  }

  const readingProgress = getReadingProgress()
  const todaysReading = getTodaysReading()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4">
            <Book className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sagrada Biblia</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estudia la Palabra de Dios con herramientas interactivas y recursos espirituales
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Verse of the Day */}
            {verseOfDay && (
              <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Versículo del Día
                  </h3>
                  <blockquote className="text-lg italic mb-3">"{verseOfDay.text}"</blockquote>
                  <cite className="text-purple-200">
                    — {verseOfDay.book_name} {verseOfDay.chapter}:{verseOfDay.verse}
                  </cite>
                </CardContent>
              </Card>
            )}

            {/* Bible Reader */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Book className="h-5 w-5" />
                    <span>Lectura Bíblica</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Controls */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Versión</Label>
                    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BIBLE_VERSIONS.map((version) => (
                          <SelectItem key={version.id} value={version.id}>
                            {version.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Libro</Label>
                    <Select value={selectedBook} onValueChange={setSelectedBook}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">
                          Antiguo Testamento
                        </div>
                        {BIBLE_BOOKS.filter((book) => book.testament === "old").map((book) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.name}
                          </SelectItem>
                        ))}
                        <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase">Nuevo Testamento</div>
                        {BIBLE_BOOKS.filter((book) => book.testament === "new").map((book) => (
                          <SelectItem key={book.id} value={book.id}>
                            {book.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Capítulo</Label>
                    <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: maxChapters }, (_, i) => i + 1).map((chapter) => (
                          <SelectItem key={chapter} value={chapter.toString()}>
                            {chapter}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Versículo</Label>
                    <Select
                      value={selectedVerse}
                      onValueChange={(verse) => {
                        setSelectedVerse(verse)
                        // Scroll automático al versículo seleccionado
                        setTimeout(() => {
                          const verseElement = document.getElementById(`verse-${verse}`)
                          if (verseElement) {
                            verseElement.scrollIntoView({ behavior: "smooth", block: "center" })
                            verseElement.classList.add("bg-yellow-200", "border-yellow-500", "border-2")
                            setTimeout(() => {
                              verseElement.classList.remove("bg-yellow-200", "border-yellow-500", "border-2")
                            }, 3000)
                          }
                        }, 100)
                      }}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Seleccionar versículo" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {chapterData?.verses?.map((verse) => (
                          <SelectItem key={verse.verse} value={verse.verse.toString()}>
                            {verse.verse}
                          </SelectItem>
                        )) ||
                          // Fallback si no hay datos del capítulo cargados
                          Array.from({ length: 50 }, (_, i) => i + 1).map((verseNum) => (
                            <SelectItem key={verseNum} value={verseNum.toString()}>
                              Versículo {verseNum}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Card className="mb-6 bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 text-blue-800 flex items-center">
                      <Search className="h-4 w-4 mr-2" />
                      Búsqueda Global en la Biblia
                    </h4>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Buscar palabras o frases en toda la Biblia..."
                        value={globalSearchQuery}
                        onChange={(e) => setGlobalSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && searchVerses()}
                        className="flex-1"
                      />
                      <Button onClick={searchVerses} disabled={searching} className="bg-blue-600 hover:bg-blue-700">
                        {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <Card className="mb-6 bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 text-yellow-800">Resultados de búsqueda:</h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {searchResults.slice(0, 5).map((verse, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium text-yellow-700">
                              {verse.book_name} {verse.chapter}:{verse.verse}
                            </span>
                            <p className="text-gray-700">{verse.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Bible Text */}
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">
                        {chapterData?.reference || `${selectedBookData?.name} ${selectedChapter}`}
                      </h3>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {chapterData?.translation_name || BIBLE_VERSIONS.find((v) => v.id === selectedVersion)?.name}
                      </Badge>
                    </div>

                    {loading ? (
                      <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="flex space-x-4">
                            <Skeleton className="w-8 h-6" />
                            <Skeleton className="flex-1 h-6" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {chapterData?.verses?.map((verse) => (
                          <div
                            key={verse.verse}
                            id={`verse-${verse.verse}`}
                            className="group relative p-4 rounded-lg hover:bg-white/50 transition-all duration-200"
                          >
                            <div className="flex items-start space-x-4">
                              <Badge
                                variant="outline"
                                className="mt-1 min-w-[2rem] justify-center bg-blue-600 text-white border-blue-600"
                              >
                                {verse.verse}
                              </Badge>
                              <p className="text-lg leading-relaxed text-gray-800 flex-1">{verse.text}</p>
                              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={`${isFavorite(verse) ? "text-red-500" : "text-gray-400"} hover:text-red-600`}
                                  onClick={() =>
                                    isFavorite(verse) ? removeFromFavorites(verse) : addToFavorites(verse)
                                  }
                                >
                                  <Heart className={`h-4 w-4 ${isFavorite(verse) ? "fill-current" : ""}`} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={`${isBookmarked(verse) ? "text-blue-500" : "text-gray-400"} hover:text-blue-600`}
                                  onClick={() => (isBookmarked(verse) ? removeBookmark(verse) : addBookmark(verse))}
                                >
                                  <Bookmark className={`h-4 w-4 ${isBookmarked(verse) ? "fill-current" : ""}`} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-gray-400 hover:text-gray-600"
                                  onClick={() => shareVerse(verse)}
                                >
                                  <Share className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-amber-200">
                      <Button
                        variant="outline"
                        className="border-amber-300 hover:bg-amber-50 bg-transparent"
                        onClick={() => {
                          const prevChapter = Math.max(1, Number.parseInt(selectedChapter) - 1)
                          setSelectedChapter(prevChapter.toString())
                        }}
                        disabled={Number.parseInt(selectedChapter) <= 1}
                      >
                        ← Capítulo Anterior
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-yellow-600">
                          <Star className="h-4 w-4 mr-2" />
                          Favoritos
                        </Button>
                        <Button size="sm" variant="ghost" className="text-blue-600">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Marcadores
                        </Button>
                      </div>
                      <Button
                        variant="outline"
                        className="border-amber-300 hover:bg-amber-50 bg-transparent"
                        onClick={() => {
                          const nextChapter = Math.min(maxChapters, Number.parseInt(selectedChapter) + 1)
                          setSelectedChapter(nextChapter.toString())
                        }}
                        disabled={Number.parseInt(selectedChapter) >= maxChapters}
                      >
                        Siguiente Capítulo →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Mover esta sección al final */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorites */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Mis Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {favorites.slice(0, 3).map((verse, index) => (
                    <div key={index} className="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50 rounded-r-lg">
                      <p className="text-sm font-medium text-blue-600 mb-1">
                        {verse.book_name} {verse.chapter}:{verse.verse}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">{verse.text.slice(0, 100)}...</p>
                    </div>
                  ))}
                  {favorites.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No tienes versículos favoritos aún. ¡Haz clic en el corazón para agregar!
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Libros Favoritos</h4>
                  <div className="flex flex-wrap gap-2">
                    {favoriteBooks.map((book) => (
                      <Badge key={book} variant="secondary" className="bg-blue-100 text-blue-800">
                        {book}
                      </Badge>
                    ))}
                    {favoriteBooks.length === 0 && <p className="text-gray-500 text-xs">Agrega libros a favoritos</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reading Plan */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Plan de Lectura</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Progreso Anual</span>
                    <span className="text-sm font-medium text-blue-600">{readingProgress.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${readingProgress.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {readingProgress.daysCompleted} días completados de {readingProgress.totalDays}
                  </p>
                  {readingProgress.streak > 0 && (
                    <p className="text-xs text-orange-600 font-medium">🔥 Racha: {readingProgress.streak} días</p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Lectura de Hoy</h4>
                  <p className="text-sm text-gray-600">
                    {todaysReading.book} {todaysReading.chapter}
                  </p>
                  <Button
                    size="sm"
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setSelectedBook(todaysReading.book.toLowerCase())
                      setSelectedChapter(todaysReading.chapter.toString())
                      markDayAsRead(todaysReading.book, todaysReading.chapter)
                    }}
                  >
                    Comenzar Lectura
                  </Button>
                  {!readingPlan && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full mt-2 bg-transparent"
                      onClick={initializeReadingPlan}
                    >
                      Iniciar Plan de Lectura
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Bible Trivia - Sección al final */}
        <div className="mt-12">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 text-center">🎮 Trivia Bíblica</CardTitle>
              <p className="text-center text-gray-600 mt-2">
                Desafía tus conocimientos bíblicos con nuestro juego interactivo
              </p>
            </CardHeader>
            <CardContent>
              <BibleTrivia />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
