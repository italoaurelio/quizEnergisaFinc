import { motion } from 'framer-motion'
import { FaTrophy, FaMedal, FaRedo, FaLeaf, FaStar, FaFire, FaHeart, FaThumbsUp } from 'react-icons/fa'

function ResultPage({ score, totalScore, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalScore) * 100)
  
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { 
      level: '🏆 EXPERT VERDE', 
      icon: FaTrophy, 
      gradient: 'var(--gradient-primary)', 
      message: 'Você é um verdadeiro guardião da energia! 🌟',
      emoji: '🎖️'
    }
    if (percentage >= 70) return { 
      level: '🥇 ECO CAMPEÃO', 
      icon: FaMedal, 
      gradient: 'var(--gradient-secondary)', 
      message: 'Excelente! Você entende muito de sustentabilidade! 🌱',
      emoji: '⭐'
    }
    if (percentage >= 50) return { 
      level: '🌿 CONSCIENTE', 
      icon: FaStar, 
      gradient: 'var(--gradient-accent)', 
      message: 'Bom trabalho! Continue aprendendo sobre energia! 💡',
      emoji: '👍'
    }
    return { 
      level: '🌱 APRENDIZ', 
      icon: FaLeaf, 
      gradient: 'var(--gradient-error)', 
      message: 'Continue estudando! Cada passo conta! 📚',
      emoji: '💪'
    }
  }

  const performance = getPerformanceLevel()
  const Icon = performance.icon

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  }

  const scoreVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
        delay: 0.5
      }
    }
  }

  const iconVariants = {
    initial: { scale: 0, y: -50 },
    animate: { 
      scale: 1,
      y: 0,
      transition: {
        delay: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    hover: { 
      scale: 1.3,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-3, 3, -3],
      rotate: [-2, 2, -2],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <>
      <motion.div 
        className="quiz-card wide"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        whileHover={{ y: -3 }}
      >
        {/* Layout responsivo - Grid no desktop, coluna no mobile */}
        <div className="result-content">
          <div className="result-left">
            <motion.div 
              variants={iconVariants}
              whileHover="hover"
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '0.8rem' 
              }}
            >
              <motion.div variants={floatingVariants} animate="animate">
                <Icon size={50} style={{ 
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                  color: percentage >= 70 ? 'var(--primary-green)' : 
                         percentage >= 50 ? 'var(--accent-orange)' : 'var(--error-red)'
                }} />
              </motion.div>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              style={{ 
                background: performance.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '1.8rem'
              }}
            >
              {performance.level}
            </motion.h1>

            <motion.div 
              variants={scoreVariants}
              className="score-circle"
              style={{ 
                background: performance.gradient,
                position: 'relative'
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                {percentage}%
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="info-card" style={{ width: '100%', margin: '0.8rem 0' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '0.8rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '0.3rem',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '900'
                  }}>
                    {score}
                  </div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                    Pontos obtidos
                  </div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    marginBottom: '0.3rem',
                    background: 'var(--gradient-secondary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '900'
                  }}>
                    {Math.floor(score / 10)}
                  </div>
                  <div style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>
                    Acertos
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="result-right">
            <motion.div 
              variants={itemVariants}
              className="info-card"
              style={{ 
                background: `linear-gradient(135deg, ${
                  percentage >= 70 ? 'rgba(0, 200, 83, 0.15)' : 
                  percentage >= 50 ? 'rgba(255, 152, 0, 0.15)' : 'rgba(244, 67, 54, 0.15)'
                }, transparent)`,
                borderColor: percentage >= 70 ? 'var(--primary-green)' : 
                            percentage >= 50 ? 'var(--accent-orange)' : 'var(--error-red)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.6rem',
                marginBottom: '0.6rem'
              }}>
                <span style={{ fontSize: '1.2rem' }}>{performance.emoji}</span>
                <h3 style={{ margin: 0, color: 'var(--text-dark)', fontSize: '1rem' }}>
                  Resultado
                </h3>
              </div>
              <p style={{ 
                margin: 0, 
                color: 'var(--text-dark)',
                fontSize: '0.9rem',
                fontWeight: '600',
                textAlign: 'center',
                lineHeight: '1.3'
              }}>
                {performance.message}
              </p>
            </motion.div>

            {/* Dicas baseadas na performance */}
            <motion.div 
              variants={itemVariants}
              className="info-card"
              style={{ 
                background: 'rgba(33, 150, 243, 0.1)'
              }}
            >
              <h4 style={{ 
                margin: '0 0 0.6rem 0', 
                color: 'var(--accent-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.9rem'
              }}>
                <FaHeart style={{ color: 'var(--error-red)' }} />
                Dica Sustentável
              </h4>
              <p style={{ 
                margin: 0, 
                color: 'var(--text-dark)',
                fontSize: '0.85rem',
                lineHeight: '1.4',
                textAlign: 'center'
              }}>
                {percentage >= 80 
                  ? "🌟 Seja um multiplicador! Ensine outros sobre eficiência energética!"
                  : percentage >= 60
                  ? "💡 Troque lâmpadas por LED e use a luz natural sempre que possível!"
                  : "🔌 Pequenas mudanças fazem diferença: desligue aparelhos da tomada!"}
              </p>
            </motion.div>

            <motion.button
              variants={itemVariants}
              onClick={onRestart}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                background: performance.gradient,
                fontSize: '1rem',
                padding: '1rem 1.5rem'
              }}
            >
              <FaRedo size={16} />
              Jogar Novamente
            </motion.button>

            <motion.div 
              variants={itemVariants}
              style={{ 
                textAlign: 'center', 
                marginTop: '0.8rem',
                fontSize: '0.85rem',
                color: 'var(--text-dark)',
                fontWeight: '600'
              }}
            >
              <FaThumbsUp style={{ color: 'var(--primary-green)', marginRight: '0.4rem' }} />
              Obrigado por cuidar do nosso planeta! 🌍💚
            </motion.div>
          </div>
        </div>
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

export default ResultPage
