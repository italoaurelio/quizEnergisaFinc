import { motion } from 'framer-motion'
import { FaTrophy, FaMedal, FaRedo, FaLeaf, FaStar } from 'react-icons/fa'

function ResultPage({ score, totalScore, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalScore) * 100)
  
  const getPerformanceLevel = () => {
    if (percentage === 100) return { 
      level: '🏆 PONTUAÇÃO MÁXIMA!', 
      icon: FaTrophy, 
      gradient: 'var(--gradient-primary)', 
      message: 'Parabéns... Pontuação máxima! Seu conhecimento pode mudar o mundo.',
      emoji: '🎖️'
    }
    if (percentage >= 80) return { 
      level: '🥇 MUITO BOM!', 
      icon: FaMedal, 
      gradient: 'var(--gradient-secondary)', 
      message: 'Show! Faltou pouco, mas seu desempenho foi muito bom.',
      emoji: '⭐'
    }
    if (percentage >= 60) return { 
      level: '🌿 BEM INFORMADO', 
      icon: FaStar, 
      gradient: 'var(--gradient-accent)', 
      message: 'Muito bom! Você está bem-informado.',
      emoji: '👍'
    }
    return { 
      level: '🌱 PODE MELHORAR', 
      icon: FaLeaf, 
      gradient: 'var(--gradient-error)', 
      message: 'Valeu! Você se empenhou, mas pode melhorar.',
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

  return (
    <motion.div 
      className="main-card"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="result-layout">
        <div className="result-content">
          {/* Coluna Esquerda - Performance e Score */}
          <motion.div className="result-left" variants={itemVariants}>
            <div className="performance-section">
              <motion.div
                className="performance-icon"
                variants={itemVariants}
                style={{
                  background: performance.gradient,
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Icon size={40} color="white" />
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="performance-title"
                style={{
                  fontSize: '2.2rem',
                  marginBottom: '1.2rem',
                  background: performance.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textAlign: 'center'
                }}
              >
                {performance.level}
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="score-display"
                style={{
                  fontSize: '3.8rem',
                  fontWeight: 'bold',
                  marginBottom: '1.2rem',
                  background: performance.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textAlign: 'center'
                }}
              >
                {percentage}%
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="performance-message"
                style={{
                  fontSize: '1.4rem',
                  color: 'var(--text-dark)',
                  textAlign: 'center',
                  lineHeight: '1.5',
                  marginBottom: '1.5rem'
                }}
              >
                {performance.message}
              </motion.p>

              <motion.div
                className="encouragement"
                variants={itemVariants}
                style={{
                  fontSize: '1.2rem',
                  color: 'var(--text-light)',
                  textAlign: 'center',
                  padding: '1.2rem',
                  background: 'rgba(0, 230, 118, 0.1)',
                  borderRadius: '16px',
                  border: '2px solid rgba(0, 230, 118, 0.2)',
                  maxWidth: '280px',
                  margin: '0 auto'
                }}
              >
                <div style={{ marginBottom: '0.4rem', fontSize: '1.2rem' }}>🌱</div>
                Continue aprendendo sobre eficiência energética e sustentabilidade!
              </motion.div>
            </div>
          </motion.div>

          {/* Coluna Direita - Estatísticas e Ações */}
          <motion.div className="result-right" variants={itemVariants}>
            <div className="stats-section">
              <motion.h2 variants={itemVariants} className="stats-title">
                📊 Suas Estatísticas
              </motion.h2>

              <motion.div className="stats-grid" variants={itemVariants}>
                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--primary-green)' }}>
                    {score}
                  </div>
                  <div className="stat-label">Pontos Obtidos</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>
                    {totalScore}
                  </div>
                  <div className="stat-label">Pontos Totais</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--accent-orange)' }}>
                    {totalQuestions}
                  </div>
                  <div className="stat-label">Perguntas</div>
                </div>

                <div className="stat-card">
                  <div className="stat-value" style={{ color: 'var(--secondary-green)' }}>
                    {Math.round((score / totalQuestions) * 10) / 10}
                  </div>
                  <div className="stat-label">Média por Pergunta</div>
                </div>
              </motion.div>

              <motion.div className="action-section" variants={itemVariants}>
                <motion.button
                  className="btn btn-primary restart-btn"
                  onClick={onRestart}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0, 230, 118, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRedo size={22} />
                  Jogar Novamente
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Logos no rodapé */}
        <motion.div 
          className="result-footer"
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '1rem',
            paddingTop: '0.8rem',
            borderTop: '1px solid rgba(0, 230, 118, 0.2)',
            flexShrink: 0
          }}
        >
          <img 
            src="/AneelLogo.png" 
            alt="ANEEL Logo" 
            style={{
              height: '35px',
              objectFit: 'contain',
              opacity: 0.8,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
          />
          <img 
            src="/EnergisaLogo.png" 
            alt="Energisa Logo" 
            style={{
              height: '35px',
              objectFit: 'contain',
              opacity: 0.8,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ResultPage
