import { NextResponse } from "next/server"

interface TriviaQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  verse_reference?: string
}

const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿Quién fue el primer rey de Israel?",
    options: ["David", "Saúl", "Salomón", "Samuel"],
    correctAnswer: 1,
    explanation:
      "Saúl fue ungido por Samuel como el primer rey de Israel, aunque más tarde fue rechazado por Dios debido a su desobediencia.",
    difficulty: "easy",
    category: "Historia",
    verse_reference: "1 Samuel 10:1",
  },
  {
    id: 2,
    question: "¿Cuántos días estuvo Jonás en el vientre del gran pez?",
    options: ["2 días", "3 días", "7 días", "40 días"],
    correctAnswer: 1,
    explanation: "Jonás 1:17 dice que Jonás estuvo en el vientre del gran pez tres días y tres noches.",
    difficulty: "easy",
    category: "Profetas",
    verse_reference: "Jonás 1:17",
  },
  {
    id: 3,
    question: "¿Cuál fue el primer milagro de Jesús?",
    options: ["Sanar a un ciego", "Convertir agua en vino", "Multiplicar panes", "Caminar sobre el agua"],
    correctAnswer: 1,
    explanation:
      "En Juan 2:1-11, Jesús convirtió agua en vino en las bodas de Caná, siendo este su primer milagro registrado.",
    difficulty: "medium",
    category: "Nuevo Testamento",
    verse_reference: "Juan 2:1-11",
  },
  {
    id: 4,
    question: "¿Quién escribió la mayoría de los Salmos?",
    options: ["Salomón", "David", "Moisés", "Asaf"],
    correctAnswer: 1,
    explanation: "El rey David escribió aproximadamente la mitad de los 150 salmos del libro de Salmos.",
    difficulty: "easy",
    category: "Escritura",
    verse_reference: "Salmos",
  },
  {
    id: 5,
    question: "¿En qué monte recibió Moisés los Diez Mandamientos?",
    options: ["Monte Carmelo", "Monte Sinaí", "Monte Hermón", "Monte Sión"],
    correctAnswer: 1,
    explanation: "Éxodo 19-20 relata cómo Moisés recibió los Diez Mandamientos en el Monte Sinaí.",
    difficulty: "medium",
    category: "Antiguo Testamento",
    verse_reference: "Éxodo 19-20",
  },
  {
    id: 6,
    question: "¿Cuántos libros tiene el Nuevo Testamento?",
    options: ["25", "27", "29", "31"],
    correctAnswer: 1,
    explanation: "El Nuevo Testamento contiene 27 libros, desde Mateo hasta Apocalipsis.",
    difficulty: "hard",
    category: "Escritura",
  },
  {
    id: 7,
    question: "¿Quién traicionó a Jesús?",
    options: ["Pedro", "Juan", "Judas Iscariote", "Tomás"],
    correctAnswer: 2,
    explanation: "Judas Iscariote traicionó a Jesús entregándolo a las autoridades por 30 monedas de plata.",
    difficulty: "easy",
    category: "Nuevo Testamento",
    verse_reference: "Mateo 26:14-16",
  },
  {
    id: 8,
    question: "¿Cuántos hermanos tenía José (hijo de Jacob)?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 1,
    explanation: "José tenía 11 hermanos, siendo él uno de los 12 hijos de Jacob (Israel).",
    difficulty: "medium",
    category: "Historia",
    verse_reference: "Génesis 35:22-26",
  },
  {
    id: 9,
    question: "¿Qué significa 'Emmanuel'?",
    options: ["Príncipe de Paz", "Dios con nosotros", "Salvador", "Mesías"],
    correctAnswer: 1,
    explanation: "Emmanuel significa 'Dios con nosotros', como se menciona en Mateo 1:23.",
    difficulty: "medium",
    category: "Nuevo Testamento",
    verse_reference: "Mateo 1:23",
  },
  {
    id: 10,
    question: "¿Quién fue lanzado al foso de los leones?",
    options: ["Daniel", "Sadrac", "Mesac", "Abed-nego"],
    correctAnswer: 0,
    explanation: "Daniel fue lanzado al foso de los leones por orar a Dios, pero fue protegido milagrosamente.",
    difficulty: "easy",
    category: "Profetas",
    verse_reference: "Daniel 6",
  },
  {
    id: 11,
    question: "¿Cuántos días ayunó Jesús en el desierto?",
    options: ["30 días", "40 días", "50 días", "70 días"],
    correctAnswer: 1,
    explanation: "Jesús ayunó 40 días y 40 noches en el desierto, donde fue tentado por Satanás.",
    difficulty: "medium",
    category: "Nuevo Testamento",
    verse_reference: "Mateo 4:1-2",
  },
  {
    id: 12,
    question: "¿Quién construyó el arca?",
    options: ["Abraham", "Noé", "Moisés", "David"],
    correctAnswer: 1,
    explanation: "Noé construyó el arca siguiendo las instrucciones de Dios para salvarse del diluvio.",
    difficulty: "easy",
    category: "Historia",
    verse_reference: "Génesis 6-8",
  },
  {
    id: 13,
    question: "¿Cuál es el versículo más corto de la Biblia?",
    options: ["Jesús lloró", "Dios es amor", "Orad sin cesar", "Gozaos siempre"],
    correctAnswer: 0,
    explanation: "'Jesús lloró' (Juan 11:35) es el versículo más corto de la Biblia en español.",
    difficulty: "hard",
    category: "Escritura",
    verse_reference: "Juan 11:35",
  },
  {
    id: 14,
    question: "¿Quién fue el discípulo que dudó de la resurrección?",
    options: ["Pedro", "Juan", "Tomás", "Felipe"],
    correctAnswer: 2,
    explanation: "Tomás dudó de la resurrección hasta que vio y tocó las heridas de Jesús.",
    difficulty: "easy",
    category: "Nuevo Testamento",
    verse_reference: "Juan 20:24-29",
  },
  {
    id: 15,
    question: "¿En qué ciudad nació Jesús?",
    options: ["Nazaret", "Belén", "Jerusalén", "Capernaum"],
    correctAnswer: 1,
    explanation: "Jesús nació en Belén de Judea, cumpliendo la profecía de Miqueas 5:2.",
    difficulty: "easy",
    category: "Nuevo Testamento",
    verse_reference: "Mateo 2:1",
  },
  {
    id: 16,
    question: "¿Cuántos discípulos eligió Jesús?",
    options: ["10", "12", "14", "16"],
    correctAnswer: 1,
    explanation: "Jesús eligió 12 discípulos, también llamados apóstoles, para que estuvieran con él.",
    difficulty: "easy",
    category: "Nuevo Testamento",
    verse_reference: "Marcos 3:13-19",
  },
  {
    id: 17,
    question: "¿Quién fue el profeta que fue llevado al cielo en un carro de fuego?",
    options: ["Eliseo", "Elías", "Ezequiel", "Isaías"],
    correctAnswer: 1,
    explanation: "Elías fue llevado al cielo en un torbellino con carros y caballos de fuego.",
    difficulty: "medium",
    category: "Profetas",
    verse_reference: "2 Reyes 2:11",
  },
  {
    id: 18,
    question: "¿Cuál fue la primera plaga de Egipto?",
    options: ["Ranas", "Agua convertida en sangre", "Piojos", "Moscas"],
    correctAnswer: 1,
    explanation: "La primera plaga fue convertir el agua del Nilo en sangre.",
    difficulty: "medium",
    category: "Historia",
    verse_reference: "Éxodo 7:14-25",
  },
  {
    id: 19,
    question: "¿Quién fue la madre de Samuel?",
    options: ["Ana", "Sara", "Rebeca", "Raquel"],
    correctAnswer: 0,
    explanation: "Ana oró fervientemente por un hijo y Dios le concedió a Samuel.",
    difficulty: "medium",
    category: "Historia",
    verse_reference: "1 Samuel 1",
  },
  {
    id: 20,
    question: "¿Cuántas veces negó Pedro a Jesús?",
    options: ["2 veces", "3 veces", "4 veces", "5 veces"],
    correctAnswer: 1,
    explanation: "Pedro negó conocer a Jesús tres veces antes de que cantara el gallo.",
    difficulty: "easy",
    category: "Nuevo Testamento",
    verse_reference: "Mateo 26:69-75",
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const count = Number.parseInt(searchParams.get("count") || "10")
    const difficulty = searchParams.get("difficulty")
    const category = searchParams.get("category")

    let filteredQuestions = [...triviaQuestions]

    // Filtrar por dificultad
    if (difficulty && difficulty !== "all") {
      filteredQuestions = filteredQuestions.filter((q) => q.difficulty === difficulty)
    }

    // Filtrar por categoría
    if (category && category !== "all") {
      filteredQuestions = filteredQuestions.filter((q) => q.category === category)
    }

    // Mezclar y seleccionar preguntas
    const shuffled = filteredQuestions.sort(() => Math.random() - 0.5)
    const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length))

    return NextResponse.json({
      questions: selectedQuestions,
      total: selectedQuestions.length,
      available: filteredQuestions.length,
    })
  } catch (error) {
    console.error("Error fetching trivia questions:", error)
    return NextResponse.json({ error: "Failed to fetch trivia questions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { answers, sessionId } = body

    // Aquí podrías guardar las respuestas en una base de datos
    // Por ahora solo calculamos el puntaje

    let score = 0
    const results = answers.map((answer: any, index: number) => {
      const question = triviaQuestions.find((q) => q.id === answer.questionId)
      if (question && answer.selectedAnswer === question.correctAnswer) {
        score += 10 // Puntos base
        return { ...answer, correct: true, points: 10 }
      }
      return { ...answer, correct: false, points: 0 }
    })

    return NextResponse.json({
      score,
      results,
      sessionId,
    })
  } catch (error) {
    console.error("Error processing trivia answers:", error)
    return NextResponse.json({ error: "Failed to process answers" }, { status: 500 })
  }
}
