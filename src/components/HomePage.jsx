import { motion } from 'framer-motion'
import { FaLeaf, FaBolt, FaLightbulb, FaPlay, FaAward, FaUsers, FaChartLine } from 'react-icons/fa'

function HomePage({ onStartQuiz, totalQuestions }) {
  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    hover: { scale: 1.3, rotate: 15, y: -5 }
  }

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
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

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <>
      <motion.div 
        className="quiz-card"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        whileHover={{ y: -2 }}
      >
        <motion.div 
          className="icon-container"
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            marginBottom: '1.5rem' 
          }}
        >
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: 0.4 }}
          >
            <motion.div variants={floatingVariants} animate="animate">
              <FaLeaf className="icon leaf-icon" size={35} />
            </motion.div>
          </motion.div>
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: 0.6 }}
          >
            <motion.div variants={floatingVariants} animate="animate" style={{ animationDelay: '1s' }}>
              <FaBolt className="icon lightning-icon" size={35} />
            </motion.div>
          </motion.div>
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ delay: 0.8 }}
          >
            <motion.div variants={floatingVariants} animate="animate" style={{ animationDelay: '2s' }}>
              <FaLightbulb className="icon energy-icon" size={35} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h1 variants={itemVariants} style={{ marginBottom: '1rem' }}>
          🌱 EcoQuiz Energisa
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          style={{ 
            textAlign: 'center', 
            marginBottom: '1.5rem', 
            color: 'var(--text-dark)',
            fontSize: '1rem',
            lineHeight: '1.4',
            fontWeight: '500'
          }}
        >
          Descubra como suas escolhas podem salvar o planeta! 🌍
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="info-card"
          style={{ 
            textAlign: 'center',
            marginBottom: '1.5rem',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            width: '100%'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FaAward style={{ color: 'var(--accent-orange)', fontSize: '1.3rem', marginBottom: '0.3rem' }} />
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                {totalQuestions}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Perguntas</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FaChartLine style={{ color: 'var(--accent-blue)', fontSize: '1.3rem', marginBottom: '0.3rem' }} />
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                {totalQuestions * 10}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Pontos Max</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FaUsers style={{ color: 'var(--primary-green)', fontSize: '1.3rem', marginBottom: '0.3rem' }} />
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                15s
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Por pergunta</span>
            </div>
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          onClick={onStartQuiz}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            fontSize: '1.1rem',
            padding: '1.2rem 2rem',
            background: 'var(--gradient-primary)',
            boxShadow: '0 8px 25px rgba(0, 230, 118, 0.4)',
            marginBottom: '1rem'
          }}
        >
          <FaPlay size={16} />
          Começar Agora!
        </motion.button>

        <motion.div 
          variants={itemVariants}
          style={{ 
            textAlign: 'center', 
            fontSize: '0.85rem',
            color: 'var(--text-light)',
            fontWeight: '500'
          }}
        >
          💡 <strong>Dica:</strong> Pense sustentável e economize energia!
        </motion.div>
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

export default HomePage
