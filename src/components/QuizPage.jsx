import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCheck, FaTimes, FaLightbulb, FaClock, FaFire,
  FaLeaf, FaBolt, FaSun, FaWater, FaHome, FaSnowflake,
  FaTv, FaPlug, FaRecycle, FaCog, FaGlobe, FaHeart
} from 'react-icons/fa'

function QuizPage({ question, questionNumber, totalQuestions, onAnswer, userAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)

  // Ícones para as alternativas baseados no contexto
  const getOptionIcon = (index, option) => {
    // Tamanho responsivo do ícone
    const getIconSize = () => {
      if (window.innerWidth <= 480) return 16
      if (window.innerWidth <= 768) return 20
      return 24
    }
    
    const iconProps = { size: getIconSize() }
    
    // Ícones baseados no conteúdo da opção
    if (option.toLowerCase().includes('solar')) return <FaSun {...iconProps} />
    if (option.toLowerCase().includes('eólica') || option.toLowerCase().includes('vento')) return <FaBolt {...iconProps} />
    if (option.toLowerCase().includes('hidrelétrica') || option.toLowerCase().includes('água')) return <FaWater {...iconProps} />
    if (option.toLowerCase().includes('biomassa') || option.toLowerCase().includes('orgânica')) return <FaLeaf {...iconProps} />
    if (option.toLowerCase().includes('geladeira')) return <FaSnowflake {...iconProps} />
    if (option.toLowerCase().includes('chuveiro') || option.toLowerCase().includes('banho')) return <FaWater {...iconProps} />
    if (option.toLowerCase().includes('ar condicionado')) return <FaSnowflake {...iconProps} />
    if (option.toLowerCase().includes('televisão') || option.toLowerCase().includes('tv')) return <FaTv {...iconProps} />
    if (option.toLowerCase().includes('energia')) return <FaBolt {...iconProps} />
    if (option.toLowerCase().includes('eficiência')) return <FaCog {...iconProps} />
    if (option.toLowerCase().includes('sustentável') || option.toLowerCase().includes('ambiente')) return <FaGlobe {...iconProps} />
    if (option.toLowerCase().includes('desligar')) return <FaPlug {...iconProps} />
    
    // Ícones padrão por posição
    const defaultIcons = [
      <FaLeaf {...iconProps} />,
      <FaBolt {...iconProps} />,
      <FaSun {...iconProps} />,
      <FaHeart {...iconProps} />
    ]
    
    return defaultIcons[index] || <FaLightbulb {...iconProps} />
  }

  useEffect(() => {
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(15)
  }, [question])

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswerSelect(-1)
    }
  }, [timeLeft, showResult])

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    setTimeout(() => {
      onAnswer(answerIndex)
    }, 2000)
  }

  const containerVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 }
  }

  const optionVariants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.02, y: -1 }
  }

  const getOptionClass = (index) => {
    if (!showResult) {
      return selectedAnswer === index ? 'option-button selected' : 'option-button'
    }
    
    if (index === question.correctAnswer) {
      return 'option-button correct'
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return 'option-button incorrect'
    }
    
    return 'option-button'
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

  return (
    <>
      <motion.div 
        className="quiz-card"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {/* Header com progresso - Compacto */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '0.8rem'
          }}>
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{ 
                color: 'white', 
                fontSize: '0.9rem',
                fontWeight: '700',
                background: 'var(--gradient-secondary)',
                padding: '0.4rem 0.8rem',
                borderRadius: '15px'
              }}
            >
              {questionNumber}/{totalQuestions}
            </motion.span>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '0.4rem 0.8rem',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.8)'
              }}
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
                fontSize: '1rem',
                fontWeight: 'bold'
              }}>
                {timeLeft}s
              </span>
            </motion.div>
          </div>
          
          <div className="progress-bar">
            <motion.div 
              className="progress-fill"
              initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
              animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* Pergunta - Tamanho fixo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ 
            marginBottom: '1rem',
            width: '100%',
            minHeight: '80px', // Altura mínima fixa
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem',
            justifyContent: 'center',
            margin: 0,
            textAlign: 'center',
            maxWidth: '100%', // Garante que não ultrapasse o container
            wordWrap: 'break-word',
            hyphens: 'auto'
          }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaLightbulb className="energy-icon" size={20} />
            </motion.div>
            <span style={{ lineHeight: '1.2' }}>{question.question}</span>
          </h2>
        </motion.div>

        {/* Opções em grade com ícones */}
        <motion.div
          className="options-grid"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              variants={optionVariants}
              whileHover={!showResult ? "hover" : {}}
              whileTap={!showResult ? { scale: 0.95 } : {}}
              className={getOptionClass(index)}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              style={{
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.8rem',
                position: 'relative', 
                zIndex: 2 
              }}>
                <div style={{ 
                  fontSize: window.innerWidth <= 480 ? '1.8rem' : window.innerWidth <= 768 ? '2.2rem' : '2.5rem', /* Ícone responsivo */
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                }}>
                  {getOptionIcon(index, option)}
                </div>
                <div style={{ 
                  fontSize: window.innerWidth <= 480 ? '0.85rem' : window.innerWidth <= 768 ? '0.95rem' : '1rem', /* Texto responsivo */
                  fontWeight: '600',
                  lineHeight: '1.2',
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  hyphens: 'auto',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: window.innerWidth <= 480 ? 3 : 4,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {option}
                </div>
              </div>
              
              {showResult && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    zIndex: 3,
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    padding: '0.3rem',
                    backdropFilter: 'blur(5px)'
                  }}
                >
                  {index === question.correctAnswer ? (
                    <FaCheck size={12} />
                  ) : selectedAnswer === index ? (
                    <FaTimes size={12} />
                  ) : null}
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Resultado da pergunta - Compacto */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -15 }}
              className="info-card"
              style={{
                textAlign: 'center',
                background: selectedAnswer === question.correctAnswer 
                  ? 'rgba(76, 175, 80, 0.2)' 
                  : selectedAnswer === -1
                  ? 'rgba(255, 152, 0, 0.2)'
                  : 'rgba(244, 67, 54, 0.2)',
                borderColor: selectedAnswer === question.correctAnswer 
                  ? 'var(--success-green)' 
                  : selectedAnswer === -1
                  ? 'var(--accent-orange)'
                  : 'var(--error-red)',
                margin: 0,
                padding: '0.8rem'
              }}
            >
              {selectedAnswer === -1 ? (
                <p style={{ 
                  margin: 0, 
                  color: 'var(--text-dark)',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  ⏰ <strong>Tempo esgotado!</strong><br/>
                  <span style={{color: 'var(--success-green)'}}>{question.options[question.correctAnswer]}</span>
                </p>
              ) : selectedAnswer === question.correctAnswer ? (
                <p style={{ 
                  margin: 0, 
                  color: 'var(--text-dark)',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  🎉 <strong style={{color: 'var(--success-green)'}}>Correto!</strong> +{question.points} pontos
                </p>
              ) : (
                <p style={{ 
                  margin: 0, 
                  color: 'var(--text-dark)',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}>
                  💡 <strong>Quase!</strong><br/>
                  <span style={{color: 'var(--success-green)'}}>{question.options[question.correctAnswer]}</span>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Logo Energisa */}
      <img 
        src="/Energisa.png" 
        alt="Energisa" 
        className="energisa-logo"
      />
    </>
  )
}

export default QuizPage
