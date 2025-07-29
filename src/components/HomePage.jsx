import { motion } from 'framer-motion'
import { FaLeaf, FaBolt, FaLightbulb, FaPlay } from 'react-icons/fa'

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
    <motion.div 
      className="main-card"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="home-layout">
        <motion.div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1.5rem', 
            marginBottom: '2rem' 
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
              <FaLeaf className="icon leaf-icon" size={40} />
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
              <FaBolt className="icon lightning-icon" size={40} />
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
              <FaLightbulb className="icon energy-icon" size={40} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants} 
          style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          🌱 Quiz Energisa
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          style={{ 
            fontSize: '1.2rem',
            color: 'var(--text-light)',
            marginBottom: '2rem',
            maxWidth: '600px',
            lineHeight: '1.6'
          }}
        >
          Teste seus conhecimentos sobre eficiência energética e sustentabilidade! 
          Descubra como pequenas ações podem fazer uma diferença para o meio ambiente e para o seu dia a dia.
        </motion.p>

        <motion.div
          variants={itemVariants}
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <div style={{ 
            background: 'var(--gradient-primary)', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            {totalQuestions} Perguntas
          </div>
          <div style={{ 
            background: 'var(--gradient-secondary)', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            Sim ou Não
          </div>
          <div style={{ 
            background: 'var(--gradient-accent)', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            15s por pergunta
          </div>
        </motion.div>

        <motion.button
          variants={itemVariants}
          className="btn btn-primary"
          onClick={onStartQuiz}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 230, 118, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          style={{ fontSize: '1.3rem', padding: '1.2rem 2.5rem', width: '80%'}}
        >
          <FaPlay size={20} />
          Começar Quiz
        </motion.button>

        {/* Logos no rodapé */}
        <motion.div 
          className="home-footer"
          variants={itemVariants}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(0, 230, 118, 0.2)'
          }}
        >
          <img 
            src="/AneelLogo.png" 
            alt="ANEEL Logo" 
            style={{
              height: '40px',
              objectFit: 'contain',
              opacity: 0.8,
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
          />
          <img 
            src="/EnergisaLogo.png" 
            alt="Energisa Logo" 
            style={{
              height: '40px',
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

export default HomePage