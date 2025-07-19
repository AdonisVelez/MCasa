// API para la Biblia usando Bible API
const BIBLE_API_BASE = "https://bible-api.com"
const BIBLE_GATEWAY_API = "https://www.biblegateway.com/passage/"

export interface BibleVerse {
  book_id: string
  book_name: string
  chapter: number
  verse: number
  text: string
}

export interface BibleChapter {
  reference: string
  verses: BibleVerse[]
  text: string
  translation_id: string
  translation_name: string
  translation_note: string
}

export interface BibleBook {
  id: string
  name: string
  testament: "old" | "new"
  chapters: number
}

// Lista de libros de la Biblia
export const BIBLE_BOOKS: BibleBook[] = [
  // Antiguo Testamento
  { id: "genesis", name: "Génesis", testament: "old", chapters: 50 },
  { id: "exodus", name: "Éxodo", testament: "old", chapters: 40 },
  { id: "leviticus", name: "Levítico", testament: "old", chapters: 27 },
  { id: "numbers", name: "Números", testament: "old", chapters: 36 },
  { id: "deuteronomy", name: "Deuteronomio", testament: "old", chapters: 34 },
  { id: "joshua", name: "Josué", testament: "old", chapters: 24 },
  { id: "judges", name: "Jueces", testament: "old", chapters: 21 },
  { id: "ruth", name: "Rut", testament: "old", chapters: 4 },
  { id: "1samuel", name: "1 Samuel", testament: "old", chapters: 31 },
  { id: "2samuel", name: "2 Samuel", testament: "old", chapters: 24 },
  { id: "1kings", name: "1 Reyes", testament: "old", chapters: 22 },
  { id: "2kings", name: "2 Reyes", testament: "old", chapters: 25 },
  { id: "psalms", name: "Salmos", testament: "old", chapters: 150 },
  { id: "proverbs", name: "Proverbios", testament: "old", chapters: 31 },

  // Nuevo Testamento
  { id: "matthew", name: "Mateo", testament: "new", chapters: 28 },
  { id: "mark", name: "Marcos", testament: "new", chapters: 16 },
  { id: "luke", name: "Lucas", testament: "new", chapters: 24 },
  { id: "john", name: "Juan", testament: "new", chapters: 21 },
  { id: "acts", name: "Hechos", testament: "new", chapters: 28 },
  { id: "romans", name: "Romanos", testament: "new", chapters: 16 },
  { id: "1corinthians", name: "1 Corintios", testament: "new", chapters: 16 },
  { id: "2corinthians", name: "2 Corintios", testament: "new", chapters: 13 },
  { id: "galatians", name: "Gálatas", testament: "new", chapters: 6 },
  { id: "ephesians", name: "Efesios", testament: "new", chapters: 6 },
  { id: "philippians", name: "Filipenses", testament: "new", chapters: 4 },
  { id: "colossians", name: "Colosenses", testament: "new", chapters: 4 },
  { id: "1thessalonians", name: "1 Tesalonicenses", testament: "new", chapters: 5 },
  { id: "2thessalonians", name: "2 Tesalonicenses", testament: "new", chapters: 3 },
  { id: "1timothy", name: "1 Timoteo", testament: "new", chapters: 6 },
  { id: "2timothy", name: "2 Timoteo", testament: "new", chapters: 4 },
  { id: "titus", name: "Tito", testament: "new", chapters: 3 },
  { id: "philemon", name: "Filemón", testament: "new", chapters: 1 },
  { id: "hebrews", name: "Hebreos", testament: "new", chapters: 13 },
  { id: "james", name: "Santiago", testament: "new", chapters: 5 },
  { id: "1peter", name: "1 Pedro", testament: "new", chapters: 5 },
  { id: "2peter", name: "2 Pedro", testament: "new", chapters: 3 },
  { id: "1john", name: "1 Juan", testament: "new", chapters: 5 },
  { id: "2john", name: "2 Juan", testament: "new", chapters: 1 },
  { id: "3john", name: "3 Juan", testament: "new", chapters: 1 },
  { id: "jude", name: "Judas", testament: "new", chapters: 1 },
  { id: "revelation", name: "Apocalipsis", testament: "new", chapters: 22 },
]

export const BIBLE_VERSIONS = [
  { id: "rvr1960", name: "Reina-Valera 1960", language: "es" },
  { id: "nvi", name: "Nueva Versión Internacional", language: "es" },
  { id: "dhh", name: "Dios Habla Hoy", language: "es" },
  { id: "ntv", name: "Nueva Traducción Viviente", language: "es" },
  { id: "kjv", name: "King James Version", language: "en" },
  { id: "niv", name: "New International Version", language: "en" },
]

class BibleAPI {
  private baseUrl = BIBLE_API_BASE

  async getChapter(book: string, chapter: number, version = "rvr1960"): Promise<BibleChapter | null> {
    try {
      // Para español, usamos Bible API
      if (version.includes("rvr") || version === "nvi" || version === "dhh") {
        const response = await fetch(`${this.baseUrl}/${book}+${chapter}?translation=${version}`)
        if (!response.ok) throw new Error("Failed to fetch chapter")

        const data = await response.json()

        // Si la API no devuelve versículos individuales, los parseamos del texto
        let verses = data.verses || []
        if (!verses.length && data.text) {
          verses = this.parseVersesFromText(data.text, book, chapter)
        }

        return {
          reference: data.reference,
          verses: verses,
          text: data.text,
          translation_id: data.translation_id,
          translation_name: data.translation_name,
          translation_note: data.translation_note || "",
        }
      }

      // Para inglés, usamos una API alternativa
      const response = await fetch(`${this.baseUrl}/${book}%20${chapter}`)
      if (!response.ok) throw new Error("Failed to fetch chapter")

      const data = await response.json()

      let verses = data.verses || []
      if (!verses.length && data.text) {
        verses = this.parseVersesFromText(data.text, book, chapter)
      }

      return {
        reference: data.reference,
        verses: verses,
        text: data.text,
        translation_id: version,
        translation_name: BIBLE_VERSIONS.find((v) => v.id === version)?.name || version,
        translation_note: "",
      }
    } catch (error) {
      console.error("Error fetching Bible chapter:", error)
      // Fallback con datos de ejemplo más completos
      return this.getMockChapter(book, chapter, version)
    }
  }

  // Función para parsear versículos del texto cuando la API no los separa
  private parseVersesFromText(text: string, book: string, chapter: number): BibleVerse[] {
    const verses: BibleVerse[] = []

    // Regex para encontrar números de versículos seguidos de texto
    const versePattern = /(\d+)\s+([^0-9]+?)(?=\s*\d+\s|$)/g
    let match

    while ((match = versePattern.exec(text)) !== null) {
      const verseNumber = Number.parseInt(match[1])
      const verseText = match[2].trim()

      if (verseText) {
        verses.push({
          book_id: book,
          book_name: BIBLE_BOOKS.find((b) => b.id === book)?.name || book,
          chapter: chapter,
          verse: verseNumber,
          text: verseText,
        })
      }
    }

    return verses
  }

  // Función para datos mock más completos
  private getMockChapter(book: string, chapter: number, version: string): BibleChapter {
    const bookData = BIBLE_BOOKS.find((b) => b.id === book)

    // Datos de ejemplo para Juan 3 (capítulo completo)
    if (book === "john" && chapter === 3) {
      return {
        reference: "Juan 3",
        verses: [
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 1,
            text: "Había un hombre de los fariseos que se llamaba Nicodemo, un principal entre los judíos.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 2,
            text: "Este vino a Jesús de noche, y le dijo: Rabí, sabemos que has venido de Dios como maestro; porque nadie puede hacer estas señales que tú haces, si no está Dios con él.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 3,
            text: "Respondió Jesús y le dijo: De cierto, de cierto te digo, que el que no naciere de nuevo, no puede ver el reino de Dios.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 4,
            text: "Nicodemo le dijo: ¿Cómo puede un hombre nacer siendo viejo? ¿Puede acaso entrar por segunda vez en el vientre de su madre, y nacer?",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 5,
            text: "Respondió Jesús: De cierto, de cierto te digo, que el que no naciere de agua y del Espíritu, no puede entrar en el reino de Dios.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 6,
            text: "Lo que es nacido de la carne, carne es; y lo que es nacido del Espíritu, espíritu es.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 7,
            text: "No te maravilles de que te dije: Os es necesario nacer de nuevo.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 8,
            text: "El viento sopla de donde quiere, y oyes su sonido; mas ni sabes de dónde viene, ni a dónde va; así es todo aquel que es nacido del Espíritu.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 9,
            text: "Respondió Nicodemo y le dijo: ¿Cómo puede hacerse esto?",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 10,
            text: "Respondió Jesús y le dijo: ¿Eres tú maestro de Israel, y no sabes esto?",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 11,
            text: "De cierto, de cierto te digo, que lo que sabemos hablamos, y lo que hemos visto, testificamos; y no recibís nuestro testimonio.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 12,
            text: "Si os he dicho cosas terrenales, y no creéis, ¿cómo creeréis si os dijere las celestiales?",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 13,
            text: "Nadie subió al cielo, sino el que descendió del cielo; el Hijo del Hombre, que está en el cielo.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 14,
            text: "Y como Moisés levantó la serpiente en el desierto, así es necesario que el Hijo del Hombre sea levantado,",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 15,
            text: "para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 16,
            text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 17,
            text: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 18,
            text: "El que en él cree, no es condenado; pero el que no cree, ya ha sido condenado, porque no ha creído en el nombre del unigénito Hijo de Dios.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 19,
            text: "Y esta es la condenación: que la luz vino al mundo, y los hombres amaron más las tinieblas que la luz, porque sus obras eran malas.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 20,
            text: "Porque todo aquel que hace lo malo, aborrece la luz y no viene a la luz, para que sus obras no sean reprendidas.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 21,
            text: "Mas el que practica la verdad viene a la luz, para que sea manifiesto que sus obras son hechas en Dios.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 22,
            text: "Después de esto, vino Jesús con sus discípulos a la tierra de Judea, y estuvo allí con ellos, y bautizaba.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 23,
            text: "Juan bautizaba también en Enón, junto a Salim, porque había allí muchas aguas; y venían, y eran bautizados.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 24,
            text: "Porque Juan no había sido aún encarcelado.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 25,
            text: "Entonces hubo discusión entre los discípulos de Juan y los judíos acerca de la purificación.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 26,
            text: "Y vinieron a Juan y le dijeron: Rabí, mira que el que estaba contigo al otro lado del Jordán, de quien tú diste testimonio, bautiza, y todos vienen a él.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 27,
            text: "Respondió Juan y dijo: No puede el hombre recibir nada, si no le fuere dado del cielo.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 28,
            text: "Vosotros mismos me sois testigos de que dije: Yo no soy el Cristo, sino que soy enviado delante de él.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 29,
            text: "El que tiene la esposa, es el esposo; mas el amigo del esposo, que está a su lado y le oye, se goza grandemente de la voz del esposo; así pues, este mi gozo está cumplido.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 30,
            text: "Es necesario que él crezca, pero que yo mengüe.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 31,
            text: "El que de arriba viene, es sobre todos; el que es de la tierra, es terrenal, y cosas terrenales habla; el que viene del cielo, es sobre todos.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 32,
            text: "Y lo que vio y oyó, esto testifica; y nadie recibe su testimonio.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 33,
            text: "El que recibe su testimonio, éste atestigua que Dios es veraz.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 34,
            text: "Porque el que Dios envió, las palabras de Dios habla; pues Dios no da el Espíritu por medida.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 35,
            text: "El Padre ama al Hijo, y todas las cosas ha entregado en su mano.",
          },
          {
            book_id: "john",
            book_name: "Juan",
            chapter: 3,
            verse: 36,
            text: "El que cree en el Hijo tiene vida eterna; pero el que rehúsa creer en el Hijo no verá la vida, sino que la ira de Dios está sobre él.",
          },
        ],
        text: "",
        translation_id: version,
        translation_name: BIBLE_VERSIONS.find((v) => v.id === version)?.name || version,
        translation_note: "",
      }
    }

    // Para otros libros/capítulos, generar algunos versículos de ejemplo
    const verseCount = Math.min(20, Math.floor(Math.random() * 30) + 10) // Entre 10 y 40 versículos
    const verses: BibleVerse[] = []

    for (let i = 1; i <= verseCount; i++) {
      verses.push({
        book_id: book,
        book_name: bookData?.name || book,
        chapter: chapter,
        verse: i,
        text: `Este es el versículo ${i} del capítulo ${chapter} de ${bookData?.name || book}. Contenido bíblico de ejemplo para demostración.`,
      })
    }

    return {
      reference: `${bookData?.name || book} ${chapter}`,
      verses: verses,
      text: "",
      translation_id: version,
      translation_name: BIBLE_VERSIONS.find((v) => v.id === version)?.name || version,
      translation_note: "",
    }
  }

  async getVerse(book: string, chapter: number, verse: number, version = "rvr1960"): Promise<BibleVerse | null> {
    try {
      const response = await fetch(`${this.baseUrl}/${book}+${chapter}:${verse}?translation=${version}`)
      if (!response.ok) throw new Error("Failed to fetch verse")

      const data = await response.json()
      if (data.verses && data.verses.length > 0) {
        return data.verses[0]
      }
      return null
    } catch (error) {
      console.error("Error fetching Bible verse:", error)
      return null
    }
  }

  async searchVerses(query: string, version = "rvr1960"): Promise<BibleVerse[]> {
    try {
      // Esta es una implementación básica - en producción usarías una API de búsqueda más robusta
      const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}&translation=${version}`)
      if (!response.ok) throw new Error("Failed to search verses")

      const data = await response.json()
      return data.verses || []
    } catch (error) {
      console.error("Error searching Bible verses:", error)
      return []
    }
  }

  async getVerseOfTheDay(): Promise<BibleVerse | null> {
    try {
      // Algunos versículos populares para rotar
      const popularVerses = [
        { book: "john", chapter: 3, verse: 16 },
        { book: "romans", chapter: 8, verse: 28 },
        { book: "philippians", chapter: 4, verse: 13 },
        { book: "psalms", chapter: 23, verse: 1 },
        { book: "jeremiah", chapter: 29, verse: 11 },
        { book: "1corinthians", chapter: 13, verse: 4 },
        { book: "matthew", chapter: 28, verse: 20 },
        { book: "isaiah", chapter: 40, verse: 31 },
      ]

      const today = new Date()
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
      const selectedVerse = popularVerses[dayOfYear % popularVerses.length]

      return await this.getVerse(selectedVerse.book, selectedVerse.chapter, selectedVerse.verse)
    } catch (error) {
      console.error("Error getting verse of the day:", error)
      return null
    }
  }
}

export const bibleAPI = new BibleAPI()
