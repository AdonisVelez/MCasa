"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Book, Bookmark, Heart, Search, Settings, BookOpen, Star, Share } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

const bibleVersions = [
  { value: "rvr1960", label: "Reina-Valera 1960" },
  { value: "nvi", label: "Nueva Versión Internacional" },
  { value: "lbla", label: "La Biblia de las Américas" },
  { value: "ntv", label: "Nueva Traducción Viviente" },
]

const bibleBooks = [
  "Génesis",
  "Éxodo",
  "Levítico",
  "Números",
  "Deuteronomio",
  "Josué",
  "Jueces",
  "Rut",
  "1 Samuel",
  "2 Samuel",
  "1 Reyes",
  "2 Reyes",
  "1 Crónicas",
  "2 Crónicas",
  "Esdras",
  "Nehemías",
  "Ester",
  "Job",
  "Salmos",
  "Proverbios",
  "Eclesiastés",
  "Cantares",
  "Isaías",
  "Jeremías",
  "Lamentaciones",
  "Ezequiel",
  "Daniel",
  "Oseas",
  "Joel",
  "Amós",
  "Abdías",
  "Jonás",
  "Miqueas",
  "Nahúm",
  "Habacuc",
  "Sofonías",
  "Hageo",
  "Zacarías",
  "Malaquías",
  "Mateo",
  "Marcos",
  "Lucas",
  "Juan",
  "Hechos",
  "Romanos",
  "1 Corintios",
  "2 Corintios",
  "Gálatas",
  "Efesios",
  "Filipenses",
  "Colosenses",
  "1 Tesalonicenses",
  "2 Tesalonicenses",
  "1 Timoteo",
  "2 Timoteo",
  "Tito",
  "Filemón",
  "Hebreos",
  "Santiago",
  "1 Pedro",
  "2 Pedro",
  "1 Juan",
  "2 Juan",
  "3 Juan",
  "Judas",
  "Apocalipsis",
]

const sampleVerses = [
  {
    number: 1,
    text: "En el principio creó Dios los cielos y la tierra.",
    isFavorite: false,
    isBookmarked: true,
  },
  {
    number: 2,
    text: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.",
    isFavorite: true,
    isBookmarked: false,
  },
  {
    number: 3,
    text: "Y dijo Dios: Sea la luz; y fue la luz.",
    isFavorite: false,
    isBookmarked: false,
  },
  {
    number: 4,
    text: "Y vio Dios que la luz era buena; y separó Dios la luz de las tinieblas.",
    isFavorite: false,
    isBookmarked: true,
  },
  {
    number: 5,
    text: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día.",
    isFavorite: true,
    isBookmarked: false,
  },
]

export default function BiblePage() {
  const [selectedVersion, setSelectedVersion] = useState("rvr1960")
  const [selectedBook, setSelectedBook] = useState("Génesis")
  const [selectedChapter, setSelectedChapter] = useState("1")
  const [verses, setVerses] = useState(sampleVerses)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleFavorite = (verseNumber: number) => {
    setVerses(
      verses.map((verse) => (verse.number === verseNumber ? { ...verse, isFavorite: !verse.isFavorite } : verse)),
    )
  }

  const toggleBookmark = (verseNumber: number) => {
    setVerses(
      verses.map((verse) => (verse.number === verseNumber ? { ...verse, isBookmarked: !verse.isBookmarked } : verse)),
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Book className="h-8 w-8 mr-3 text-blue-600" />
              Sagrada Biblia
            </h1>
            <p className="text-gray-600">Estudia la Palabra de Dios con herramientas interactivas</p>
          </div>

          {/* Controles de Navegación */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Navegación Bíblica</span>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Versión</label>
                  <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bibleVersions.map((version) => (
                        <SelectItem key={version.value} value={version.value}>
                          {version.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Libro</label>
                  <Select value={selectedBook} onValueChange={setSelectedBook}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bibleBooks.map((book) => (
                        <SelectItem key={book} value={book}>
                          {book}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Capítulo</label>
                  <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 50 }, (_, i) => i + 1).map((chapter) => (
                        <SelectItem key={chapter} value={chapter.toString()}>
                          {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Buscar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar versículos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contenido Bíblico */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  {selectedBook} {selectedChapter}
                </CardTitle>
                <Badge variant="secondary">{bibleVersions.find((v) => v.value === selectedVersion)?.label}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verses.map((verse) => (
                  <div key={verse.number} className="group relative">
                    <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <Badge variant="outline" className="mt-1 min-w-[2rem] justify-center">
                        {verse.number}
                      </Badge>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed text-lg">{verse.text}</p>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(verse.number)}
                          className={verse.isFavorite ? "text-red-500" : "text-gray-400"}
                        >
                          <Heart className={`h-4 w-4 ${verse.isFavorite ? "fill-current" : ""}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(verse.number)}
                          className={verse.isBookmarked ? "text-blue-500" : "text-gray-400"}
                        >
                          <Bookmark className={`h-4 w-4 ${verse.isBookmarked ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navegación de Capítulos */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button variant="outline">← Capítulo Anterior</Button>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Favoritos
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Marcadores
                  </Button>
                </div>
                <Button variant="outline">Siguiente Capítulo →</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
