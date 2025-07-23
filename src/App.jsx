import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HomePage from './components/HomePage'
import QuizPage from './components/QuizPage'
import ResultPage from './components/ResultPage'
import questionsData from './data/questions.json'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'quiz', 'result'
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  const startQuiz = () => {
    setCurrentPage('quiz')
    setScore(0)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
  }

  const nextQuestion = (selectedAnswer) => {
    const newUserAnswers = [...userAnswers, selectedAnswer]
    setUserAnswers(newUserAnswers)

    // Verificar se a resposta está correta
    const currentQuestion = questionsData[currentQuestionIndex]
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points)
    }

    // Verificar se é a última pergunta
    if (currentQuestionIndex + 1 >= questionsData.length) {
      setTimeout(() => {
        setCurrentPage('result')
      }, 1500) // Delay para mostrar o resultado da última pergunta
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 1500) // Delay para mostrar o resultado antes da próxima pergunta
    }
  }

  const restartQuiz = () => {
    setCurrentPage('home')
    setScore(0)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
  }

  const totalPossibleScore = questionsData.reduce((total, question) => total + question.points, 0)

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 }
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
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
            <HomePage onStartQuiz={startQuiz} totalQuestions={questionsData.length} />
          </motion.div>
        )}

        {currentPage === 'quiz' && (
          <motion.div
            key="quiz"
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
              onRestart={restartQuiz}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
