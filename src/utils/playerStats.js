// Utilitário para gerenciar estatísticas dos jogadores
import playerStatsData from '../data/playerStats.json'

const STORAGE_KEY = 'energisa-quiz-total-players'

export const PlayerStatsService = {
  // Obter estatísticas atuais
  getStats: () => {
    // Primeiro tenta pegar do localStorage
    const savedCount = localStorage.getItem(STORAGE_KEY)
    if (savedCount !== null) {
      return { totalPlayers: parseInt(savedCount, 10) }
    }
    
    // Se não tem no localStorage, usa o valor do arquivo JSON e salva
    const initialCount = playerStatsData.totalPlayers
    localStorage.setItem(STORAGE_KEY, initialCount.toString())
    return { totalPlayers: initialCount }
  },

  // Incrementar contador de jogadores
  incrementPlayerCount: () => {
    const currentStats = PlayerStatsService.getStats()
    const newCount = currentStats.totalPlayers + 1
    
    // Salva o novo valor no localStorage
    localStorage.setItem(STORAGE_KEY, newCount.toString())
    
    return { totalPlayers: newCount }
  },

  // Resetar para o valor do arquivo JSON (para teste)
  resetToFileValue: () => {
    const fileValue = playerStatsData.totalPlayers
    localStorage.setItem(STORAGE_KEY, fileValue.toString())
    return { totalPlayers: fileValue }
  }
}
