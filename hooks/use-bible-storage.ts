"use client"

import { useState, useEffect } from "react"
import type { BibleVerse } from "@/lib/bible-api"

interface FavoriteVerse extends BibleVerse {
  dateAdded: string
}

interface BookmarkedVerse extends BibleVerse {
  dateAdded: string
  note?: string
}

interface ReadingProgress {
  date: string
  book: string
  chapter: number
  completed: boolean
}

interface ReadingPlan {
  startDate: string
  currentDay: number
  totalDays: number
  progress: ReadingProgress[]
  streak: number
  lastReadDate: string
}

export function useBibleStorage() {
  const [favorites, setFavorites] = useState<FavoriteVerse[]>([])
  const [bookmarks, setBookmarks] = useState<BookmarkedVerse[]>([])
  const [readingPlan, setReadingPlan] = useState<ReadingPlan | null>(null)
  const [favoriteBooks, setFavoriteBooks] = useState<string[]>([])

  // Cargar datos del localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = localStorage.getItem("bible-favorites")
      const savedBookmarks = localStorage.getItem("bible-bookmarks")
      const savedReadingPlan = localStorage.getItem("bible-reading-plan")
      const savedFavoriteBooks = localStorage.getItem("bible-favorite-books")

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks))
      }
      if (savedReadingPlan) {
        setReadingPlan(JSON.parse(savedReadingPlan))
      }
      if (savedFavoriteBooks) {
        setFavoriteBooks(JSON.parse(savedFavoriteBooks))
      }
    }
  }, [])

  // Guardar favoritos
  const addToFavorites = (verse: BibleVerse) => {
    const favoriteVerse: FavoriteVerse = {
      ...verse,
      dateAdded: new Date().toISOString(),
    }
    const newFavorites = [...favorites, favoriteVerse]
    setFavorites(newFavorites)
    localStorage.setItem("bible-favorites", JSON.stringify(newFavorites))
  }

  const removeFromFavorites = (verse: BibleVerse) => {
    const newFavorites = favorites.filter(
      (fav) => !(fav.book_id === verse.book_id && fav.chapter === verse.chapter && fav.verse === verse.verse),
    )
    setFavorites(newFavorites)
    localStorage.setItem("bible-favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (verse: BibleVerse) => {
    return favorites.some(
      (fav) => fav.book_id === verse.book_id && fav.chapter === verse.chapter && fav.verse === verse.verse,
    )
  }

  // Guardar marcadores
  const addBookmark = (verse: BibleVerse, note?: string) => {
    const bookmarkedVerse: BookmarkedVerse = {
      ...verse,
      dateAdded: new Date().toISOString(),
      note,
    }
    const newBookmarks = [...bookmarks, bookmarkedVerse]
    setBookmarks(newBookmarks)
    localStorage.setItem("bible-bookmarks", JSON.stringify(newBookmarks))
  }

  const removeBookmark = (verse: BibleVerse) => {
    const newBookmarks = bookmarks.filter(
      (bookmark) =>
        !(bookmark.book_id === verse.book_id && bookmark.chapter === verse.chapter && bookmark.verse === verse.verse),
    )
    setBookmarks(newBookmarks)
    localStorage.setItem("bible-bookmarks", JSON.stringify(newBookmarks))
  }

  const isBookmarked = (verse: BibleVerse) => {
    return bookmarks.some(
      (bookmark) =>
        bookmark.book_id === verse.book_id && bookmark.chapter === verse.chapter && bookmark.verse === verse.verse,
    )
  }

  // Plan de lectura
  const initializeReadingPlan = () => {
    const today = new Date()
    const plan: ReadingPlan = {
      startDate: today.toISOString(),
      currentDay: 1,
      totalDays: 365,
      progress: [],
      streak: 0,
      lastReadDate: "",
    }
    setReadingPlan(plan)
    localStorage.setItem("bible-reading-plan", JSON.stringify(plan))
  }

  const markDayAsRead = (book: string, chapter: number) => {
    if (!readingPlan) return

    const today = new Date().toDateString()
    const newProgress: ReadingProgress = {
      date: today,
      book,
      chapter,
      completed: true,
    }

    const updatedProgress = [...readingPlan.progress, newProgress]
    const newStreak =
      readingPlan.lastReadDate === new Date(Date.now() - 86400000).toDateString() ? readingPlan.streak + 1 : 1

    const updatedPlan: ReadingPlan = {
      ...readingPlan,
      currentDay: readingPlan.currentDay + 1,
      progress: updatedProgress,
      streak: newStreak,
      lastReadDate: today,
    }

    setReadingPlan(updatedPlan)
    localStorage.setItem("bible-reading-plan", JSON.stringify(updatedPlan))
  }

  const getReadingProgress = () => {
    if (!readingPlan) return { percentage: 0, daysCompleted: 0, streak: 0 }

    const daysCompleted = readingPlan.progress.length
    const percentage = Math.round((daysCompleted / readingPlan.totalDays) * 100)

    return {
      percentage,
      daysCompleted,
      streak: readingPlan.streak,
      totalDays: readingPlan.totalDays,
    }
  }

  const getTodaysReading = () => {
    // Plan de lectura simple: un capítulo por día
    const readings = [
      { book: "Génesis", chapters: [1, 2, 3] },
      { book: "Éxodo", chapters: [1, 2, 3] },
      { book: "Mateo", chapters: [1, 2, 3] },
      { book: "Marcos", chapters: [1, 2, 3] },
      { book: "Juan", chapters: [1, 2, 3] },
      { book: "Salmos", chapters: [1, 23, 91] },
    ]

    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const readingIndex = dayOfYear % readings.length
    const chapterIndex = Math.floor(dayOfYear / readings.length) % 3

    return {
      book: readings[readingIndex].book,
      chapter: readings[readingIndex].chapters[chapterIndex],
    }
  }

  // Libros favoritos
  const addFavoriteBook = (bookName: string) => {
    if (!favoriteBooks.includes(bookName)) {
      const newFavoriteBooks = [...favoriteBooks, bookName]
      setFavoriteBooks(newFavoriteBooks)
      localStorage.setItem("bible-favorite-books", JSON.stringify(newFavoriteBooks))
    }
  }

  const removeFavoriteBook = (bookName: string) => {
    const newFavoriteBooks = favoriteBooks.filter((book) => book !== bookName)
    setFavoriteBooks(newFavoriteBooks)
    localStorage.setItem("bible-favorite-books", JSON.stringify(newFavoriteBooks))
  }

  // Compartir versículo
  const shareVerse = async (verse: BibleVerse) => {
    const text = `"${verse.text}" - ${verse.book_name} ${verse.chapter}:${verse.verse}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${verse.book_name} ${verse.chapter}:${verse.verse}`,
          text: text,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
        copyToClipboard(text)
      }
    } else {
      copyToClipboard(text)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Mostrar notificación de copiado
      alert("Versículo copiado al portapapeles")
    })
  }

  return {
    // Favoritos
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,

    // Marcadores
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,

    // Plan de lectura
    readingPlan,
    initializeReadingPlan,
    markDayAsRead,
    getReadingProgress,
    getTodaysReading,

    // Libros favoritos
    favoriteBooks,
    addFavoriteBook,
    removeFavoriteBook,

    // Compartir
    shareVerse,
  }
}
