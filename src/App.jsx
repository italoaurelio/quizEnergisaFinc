import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from './components/HomePage'
import QuizPage from './components/QuizPage'
import ResultPage from './components/ResultPage'
import questionsData from './data/questions.json'
import { PlayerStatsService } from './utils/playerStats'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'quiz', 'result'
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [playerStats, setPlayerStats] = useState({ totalPlayers: 0 })

  // Carregar estatísticas dos jogadores ao inicializar
  useEffect(() => {
    const stats = PlayerStatsService.getStats()
    setPlayerStats(stats)
  }, [])

  const startQuiz = () => {
    setCurrentPage('quiz')
    setScore(0)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
  }

  const nextQuestion = (selectedAnswer) => {
    const newUserAnswers = [...userAnswers, selectedAnswer]
    setUserAnswers(newUserAnswers)

    // Calcular pontuação final para o resultado
    const currentQuestion = questionsData[currentQuestionIndex]
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points)
    }

    // Verificar se é a última pergunta
    if (currentQuestionIndex + 1 >= questionsData.length) {
      // Incrementar contador de jogadores quando o quiz é concluído
      const newStats = PlayerStatsService.incrementPlayerCount()
      setPlayerStats(newStats)
      setCurrentPage('result')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const restartQuiz = () => {
    setCurrentPage('home')
    setScore(0)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
  }

  // Calcular pontuação atual baseada nas respostas já dadas
  const getCurrentScore = () => {
    let currentScore = 0
    for (let i = 0; i < userAnswers.length; i++) {
      const question = questionsData[i]
      if (userAnswers[i] === question.correctAnswer) {
        currentScore += question.points
      }
    }
    return currentScore
  }

  const totalPossibleScore = questionsData.reduce((total, question) => total + question.points, 0)

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  }

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
  }

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage 
              onStartQuiz={startQuiz} 
              totalQuestions={questionsData.length}
              totalPlayers={playerStats.totalPlayers}
            />
          </motion.div>
        )}

        {currentPage === 'quiz' && (
          <motion.div
            key={`quiz-${currentQuestionIndex}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <QuizPage
              question={questionsData[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={questionsData.length}
              onAnswer={nextQuestion}
              userAnswer={userAnswers[currentQuestionIndex]}
              currentScore={getCurrentScore()}
            />
          </motion.div>
        )}

        {currentPage === 'result' && (
          <motion.div
            key="result"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ResultPage
              score={score}
              totalScore={totalPossibleScore}
              totalQuestions={questionsData.length}
              totalPlayers={playerStats.totalPlayers}
              onRestart={restartQuiz}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
