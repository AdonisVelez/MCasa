"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  Play,
  RotateCcw,
  Target,
  Award,
  Zap,
  X,
  Heart,
  Loader2,
} from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  verse_reference?: string
}

export function BibleTrivia() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "finished" | "loading">("menu")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeLeft, setTimeLeft] = useState(30)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [gameQuestions, setGameQuestions] = useState<Question[]>([])
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [loading, setLoading] = useState(false)

  // Cargar preguntas desde la API
  const loadQuestions = async (difficulty = "all", category = "all") => {
    setLoading(true)
    try {
      const response = await fetch(`/api/trivia?count=10&difficulty=${difficulty}&category=${category}`)
      if (response.ok) {
        const data = await response.json()
        setGameQuestions(data.questions)
      } else {
        console.error("Failed to load questions")
        // Fallback a preguntas locales si la API falla
        setGameQuestions([])
      }
    } catch (error) {
      console.error("Error loading questions:", error)
      setGameQuestions([])
    } finally {
      setLoading(false)
    }
  }

  // Inicializar juego
  const startGame = async (difficulty = "all", category = "all") => {
    setGameState("loading")
    await loadQuestions(difficulty, category)
    setGameState("playing")
    setCurrentQuestion(0)
    setScore(0)
    setLives(3)
    setTimeLeft(30)
    setSelectedAnswer(null)
    setShowResult(false)
    setStreak(0)
    setCorrectAnswers(0)
  }

  // Cancelar juego
  const cancelGame = () => {
    setGameState("menu")
    setCurrentQuestion(0)
    setScore(0)
    setLives(3)
    setTimeLeft(30)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameQuestions([])
    setStreak(0)
    setCorrectAnswers(0)
  }

  // Timer
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1) // Tiempo agotado
    }
  }, [timeLeft, gameState, showResult])

  // Manejar respuesta
  const handleAnswer = (answerIndex: number) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const currentQ = gameQuestions[currentQuestion]
    const isCorrect = answerIndex === currentQ.correctAnswer

    if (isCorrect) {
      const points = getPoints(currentQ.difficulty, timeLeft)
      setScore(score + points)
      setStreak(streak + 1)
      setBestStreak(Math.max(bestStreak, streak + 1))
      setCorrectAnswers(correctAnswers + 1)
    } else {
      setStreak(0)
      const newLives = lives - 1
      setLives(newLives)

      // Si se acabaron las vidas, terminar el juego
      if (newLives === 0) {
        setTimeout(() => {
          setGameState("finished")
        }, 3000)
        return
      }
    }

    // Avanzar a la siguiente pregunta después de 3 segundos
    setTimeout(() => {
      if (currentQuestion < gameQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setTimeLeft(30)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setGameState("finished")
      }
    }, 3000)
  }

  // Calcular puntos basado en dificultad y tiempo
  const getPoints = (difficulty: string, timeRemaining: number) => {
    const basePoints = {
      easy: 10,
      medium: 20,
      hard: 30,
    }
    const timeBonus = Math.floor(timeRemaining / 5) * 2
    return basePoints[difficulty as keyof typeof basePoints] + timeBonus
  }

  // Obtener color de dificultad
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  // Reiniciar juego
  const resetGame = () => {
    setGameState("menu")
    setCurrentQuestion(0)
    setScore(0)
    setLives(3)
    setTimeLeft(30)
    setSelectedAnswer(null)
    setShowResult(false)
    setGameQuestions([])
    setStreak(0)
    setCorrectAnswers(0)
  }

  if (gameState === "menu") {
    return (
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold mb-2">Trivia Bíblica</h3>
            <p className="text-purple-100 mb-6">
              Pon a prueba tus conocimientos bíblicos con preguntas de diferentes niveles de dificultad
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
            <div className="bg-white/10 rounded-lg p-3">
              <Target className="h-6 w-6 mx-auto mb-1" />
              <div className="text-sm">10 Preguntas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <Clock className="h-6 w-6 mx-auto mb-1" />
              <div className="text-sm">30s por pregunta</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <Heart className="h-6 w-6 mx-auto mb-1 text-red-400" />
              <div className="text-sm">3 Vidas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <Star className="h-6 w-6 mx-auto mb-1" />
              <div className="text-sm">API Conectada</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-3">Puntuación:</h4>
            <div className="flex justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Fácil: 10-20 pts
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                Medio: 20-30 pts
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Difícil: 30-40 pts
              </div>
            </div>
            <p className="text-xs text-purple-200 mt-2">+ Bonus por tiempo restante</p>
          </div>

          <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-red-200 mb-2">⚠️ Reglas del Juego:</h4>
            <ul className="text-sm text-red-100 space-y-1">
              <li>• Tienes 3 vidas para completar el juego</li>
              <li>• Cada respuesta incorrecta te cuesta 1 vida</li>
              <li>• Si se acaba el tiempo, también pierdes 1 vida</li>
              <li>• El juego termina si pierdes las 3 vidas</li>
              <li>• Las preguntas se cargan desde nuestra API</li>
            </ul>
          </div>

          <Button
            onClick={() => startGame()}
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <Play className="h-5 w-5 mr-2" />
                Jugar Ahora
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (gameState === "loading") {
    return (
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin text-yellow-400" />
          <h3 className="text-2xl font-bold mb-2">Cargando Preguntas...</h3>
          <p className="text-purple-100">Conectando con la API de trivia bíblica</p>
        </CardContent>
      </Card>
    )
  }

  if (gameState === "playing" && gameQuestions.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white">
        <CardContent className="p-8 text-center">
          <XCircle className="h-16 w-16 mx-auto mb-4 text-red-200" />
          <h3 className="text-2xl font-bold mb-2">Error al Cargar</h3>
          <p className="text-red-100 mb-6">No se pudieron cargar las preguntas desde la API</p>
          <Button onClick={resetGame} className="bg-white text-red-600 hover:bg-gray-100">
            Volver al Menú
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (gameState === "playing") {
    const currentQ = gameQuestions[currentQuestion]
    const progress = ((currentQuestion + 1) / gameQuestions.length) * 100

    return (
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          {/* Header del juego */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Badge className="bg-yellow-500 text-purple-900 font-bold">
                Pregunta {currentQuestion + 1}/{gameQuestions.length}
              </Badge>
              <Badge className={`${getDifficultyColor(currentQ.difficulty)} text-white`}>
                {currentQ.difficulty === "easy" ? "Fácil" : currentQ.difficulty === "medium" ? "Medio" : "Difícil"}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {currentQ.category}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              {/* Vidas */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart key={i} className={`h-5 w-5 ${i < lives ? "text-red-400 fill-current" : "text-gray-400"}`} />
                ))}
              </div>
              {streak > 0 && (
                <div className="flex items-center bg-orange-500 px-2 py-1 rounded-full">
                  <Zap className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">{streak}</span>
                </div>
              )}
              <div className="text-right">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-xs text-purple-200">puntos</div>
              </div>
            </div>
          </div>

          {/* Progreso */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progreso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/20" />
          </div>

          {/* Timer */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-5 w-5" />
              <span className="text-2xl font-bold">{timeLeft}s</span>
            </div>
            <Progress
              value={(timeLeft / 30) * 100}
              className={`h-2 ${timeLeft <= 10 ? "bg-red-200" : "bg-white/20"}`}
            />
          </div>

          {/* Pregunta */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-center leading-relaxed">{currentQ.question}</h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                let buttonClass =
                  "w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 p-4 rounded-lg transition-all text-left border-2 border-transparent"

                if (showResult) {
                  if (index === currentQ.correctAnswer) {
                    buttonClass =
                      "w-full flex items-center space-x-3 bg-green-500 p-4 rounded-lg text-left border-2 border-green-400"
                  } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                    buttonClass =
                      "w-full flex items-center space-x-3 bg-red-500 p-4 rounded-lg text-left border-2 border-red-400"
                  } else {
                    buttonClass =
                      "w-full flex items-center space-x-3 bg-white/10 p-4 rounded-lg text-left border-2 border-transparent opacity-50"
                  }
                }

                return (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={showResult} className={buttonClass}>
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg flex-1">{option}</span>
                    {showResult && index === currentQ.correctAnswer && <CheckCircle className="h-6 w-6 text-white" />}
                    {showResult && index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer && (
                      <XCircle className="h-6 w-6 text-white" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Explicación */}
            {showResult && (
              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <h4 className="font-bold mb-2 flex items-center">
                  {selectedAnswer === currentQ.correctAnswer ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                      ¡Correcto!
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 mr-2 text-red-400" />
                      {timeLeft === 0 ? "¡Tiempo agotado!" : "Incorrecto"}
                      {lives > 0 && <span className="ml-2 text-red-300">(-1 vida)</span>}
                    </>
                  )}
                </h4>
                <p className="text-purple-100 text-sm mb-2">{currentQ.explanation}</p>
                {currentQ.verse_reference && (
                  <p className="text-purple-200 text-xs">📖 Referencia: {currentQ.verse_reference}</p>
                )}
                {selectedAnswer === currentQ.correctAnswer && (
                  <div className="mt-2 text-yellow-400 font-bold">
                    +{getPoints(currentQ.difficulty, timeLeft)} puntos
                  </div>
                )}
                {lives === 0 && (
                  <div className="mt-2 p-2 bg-red-500/30 rounded text-red-200 text-sm">
                    ¡Se acabaron las vidas! El juego terminará...
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botón Cancelar */}
          <div className="text-center">
            <Button
              onClick={cancelGame}
              variant="outline"
              size="sm"
              className="border-red-400 text-red-300 hover:bg-red-500 hover:text-white bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar Juego
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (gameState === "finished") {
    const percentage = gameQuestions.length > 0 ? Math.round((correctAnswers / gameQuestions.length) * 100) : 0
    const questionsAnswered = currentQuestion + (showResult ? 1 : 0)

    let message = ""
    let messageColor = ""

    if (lives === 0) {
      message = "¡No te rindas! Sigue estudiando la Palabra."
      messageColor = "text-red-400"
    } else if (percentage >= 80) {
      message = "¡Excelente conocimiento bíblico!"
      messageColor = "text-green-400"
    } else if (percentage >= 60) {
      message = "¡Buen trabajo! Sigue estudiando."
      messageColor = "text-yellow-400"
    } else {
      message = "¡Sigue leyendo la Biblia!"
      messageColor = "text-blue-400"
    }

    return (
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
          <h3 className="text-2xl font-bold mb-2">{lives === 0 ? "¡Juego Terminado!" : "¡Felicitaciones!"}</h3>
          <p className={`text-lg mb-6 ${messageColor} font-semibold`}>{message}</p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400">{score}</div>
              <div className="text-sm text-purple-200">Puntos Totales</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">
                {correctAnswers}/{questionsAnswered}
              </div>
              <div className="text-sm text-purple-200">Respuestas Correctas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-400">{percentage}%</div>
              <div className="text-sm text-purple-200">Precisión</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-400">{bestStreak}</div>
              <div className="text-sm text-purple-200">Mejor Racha</div>
            </div>
          </div>

          {lives > 0 && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400 rounded-lg">
              <h4 className="font-bold text-green-200 mb-2">🎉 ¡Completaste el juego!</h4>
              <p className="text-green-100 text-sm">
                Respondiste {questionsAnswered} preguntas y te quedaron {lives} vida{lives !== 1 ? "s" : ""}.
              </p>
            </div>
          )}

          <div className="flex space-x-4 justify-center">
            <Button onClick={() => startGame()} className="bg-yellow-500 hover:bg-yellow-600 text-purple-900 font-bold">
              <Play className="h-4 w-4 mr-2" />
              Jugar de Nuevo
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Volver al Menú
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
