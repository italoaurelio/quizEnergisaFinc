import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaTimes, FaLightbulb, FaClock, FaFire, FaStar } from 'react-icons/fa'

function QuizPage({ question, questionNumber, totalQuestions, onAnswer, userAnswer, currentScore }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [popupTimer, setPopupTimer] = useState(3)

  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(10)
    setPopupTimer(10)
  }, [question])

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswerSelect(-1)
    }
  }, [timeLeft, showResult])

  useEffect(() => {
    if (showResult && popupTimer > 0) {
      const timer = setTimeout(() => setPopupTimer(popupTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (showResult && popupTimer === 0) {
      // Pequeno delay para completar a animação antes de mudar
      setTimeout(() => {
        onAnswer(selectedAnswer)
      }, 300)
    }
  }, [showResult, popupTimer, selectedAnswer, onAnswer])

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setPopupTimer(10)
  }

  const getButtonClass = (index) => {
    if (!showResult) {
      return selectedAnswer === index ? 'yes-no-button selected' : 'yes-no-button'
    }
    
    if (index === question.correctAnswer) {
      return 'yes-no-button correct'
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'yes-no-button incorrect'
    }
    
    return 'yes-no-button'
  }

  const getTimeColor = () => {
    if (timeLeft > 10) return 'var(--primary-green)'
    if (timeLeft > 5) return 'var(--accent-orange)'
    return 'var(--error-red)'
  }

  const getTimeIcon = () => {
    if (timeLeft > 5) return <FaClock />
    return <FaFire />
  }

  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <motion.div 
      className="main-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="quiz-container">
        {/* Header com progresso */}
        <div className="quiz-header">
            <motion.span 
              className="question-counter"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {questionNumber}/{totalQuestions}
            </motion.span>
            
            <motion.div 
              className="score-display-quiz"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              key={currentScore} // Força re-render quando a pontuação muda
              style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '25px',
                fontWeight: 'bold',
                fontSize: '1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                boxShadow: '0 4px 15px rgba(0, 230, 118, 0.3)'
              }}
            >
              <FaStar size={20} />
              {currentScore || 0} pts
            </motion.div>
            
            <motion.div 
              className="timer"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <motion.div
                animate={{ 
                  scale: timeLeft <= 5 ? [1, 1.2, 1] : 1,
                  color: getTimeColor()
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: timeLeft <= 5 ? Infinity : 0
                }}
                style={{ color: getTimeColor() }}
              >
                {getTimeIcon()}
              </motion.div>
              <span style={{ 
                color: getTimeColor(),
                fontSize: '1.4rem',
                fontWeight: 'bold'
              }}>
                {timeLeft}s
              </span>
            </motion.div>
          </div>
          
          {/* Barra de progresso */}
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Pergunta */}
          <div className="question-container">
            <motion.h2
              className="question-text"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaLightbulb style={{ color: '#00E676' }} size={35} />
              </motion.div>
              <span>{question.question}</span>
            </motion.h2>
          </div>

          {/* Opções Sim/Não */}
          <motion.div
            className="yes-no-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                className={getButtonClass(index)}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                whileHover={!showResult ? { scale: 1.05 } : {}}
                whileTap={!showResult ? { scale: 0.95 } : {}}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>

          {/* Explicação como Popup Overlay */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000,
                  padding: '2rem'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  style={{
                    background: 'white',
                    borderRadius: '25px',
                    padding: '2.5rem',
                    maxWidth: '700px',
                    width: '90%',
                    maxHeight: '75vh',
                    overflowY: 'auto',
                    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)',
                    border: `4px solid ${isCorrect ? '#4CAF50' : '#F44336'}`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                    fontSize: '1.4rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {isCorrect ? (
                        <FaCheck style={{ color: '#4CAF50', fontSize: '2rem' }} />
                      ) : (
                        <FaTimes style={{ color: '#F44336', fontSize: '2rem' }} />
                      )}
                      <strong style={{ 
                        color: isCorrect ? '#4CAF50' : '#F44336',
                        fontSize: '1.6rem'
                      }}>
                        {isCorrect ? 'Resposta Correta!' : 'sResposta Incorreta!'}
                      </strong>
                    </div>
                    
                    {/* Timer circular */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '65px',
                      height: '65px',
                      borderRadius: '50%',
                      background: `conic-gradient(${isCorrect ? '#4CAF50' : '#F44336'} ${((3 - popupTimer) / 3) * 360}deg, rgba(0,0,0,0.1) 0deg)`,
                      color: isCorrect ? '#4CAF50' : '#F44336',
                      fontWeight: 'bold',
                      fontSize: '1.5rem'
                    }}>
                      {popupTimer}
                    </div>
                  </div>

                  {/* Pontuação obtida */}
                  {isCorrect && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.8rem',
                      marginBottom: '1.5rem',
                      padding: '1.2rem',
                      background: 'rgba(76, 175, 80, 0.2)',
                      borderRadius: '15px',
                      color: '#4CAF50',
                      fontWeight: 'bold',
                      fontSize: '1.3rem'
                    }}>
                      <FaStar size={20} />
                      +{question.points || 10} pontos!
                    </div>
                  )}
                  
                  <p style={{ 
                    margin: 0, 
                    fontSize: '1.3rem',
                    lineHeight: '1.6',
                    color: 'var(--text-dark)',
                    marginBottom: '2rem'
                  }}>
                    {question.explanation}
                  </p>

                  <div style={{
                    padding: '1.3rem',
                    background: isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                    borderRadius: '15px',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    color: 'var(--text-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.8rem'
                  }}>
                    <FaClock size={18} />
                    Próxima pergunta em {popupTimer}s
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logos no rodapé */}
          <motion.div 
            className="quiz-footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(0, 230, 118, 0.2)',
              width: '100%',
              maxWidth: '500px'
            }}
          >
            <img 
              src="/AneelLogo.png" 
              alt="ANEEL Logo" 
              style={{
                height: '65px',
                objectFit: 'contain',
                opacity: 0.8,
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
              }}
            />
            <img 
              src="/EnergisaLogo.png" 
              alt="Energisa Logo" 
              style={{
                height: '65px',
                objectFit: 'contain',
                opacity: 0.8,
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
              }}
            />
          </motion.div>
      </div>
    </motion.div>
  )
}

export default QuizPage
