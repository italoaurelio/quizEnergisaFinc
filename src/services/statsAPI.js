// Simulação de API para gerenciar estatísticas
// Em produção, isso seria substituído por chamadas reais para um backend

class StatsAPI {
  constructor() {
    this.baseURL = '/api/stats' // URL base da API (simulada)
    this.localKey = 'quiz-energisa-stats-sync'
  }

  // Simular carregamento das estatísticas do servidor
  async getStats() {
    try {
      // Em produção, isso seria: await fetch(`${this.baseURL}/players`)
      // Por enquanto, vamos usar uma combinação de arquivo JSON + localStorage para simular sincronização
      
      const localStats = localStorage.getItem(this.localKey)
      if (localStats) {
        return JSON.parse(localStats)
      }
      
      // Valor inicial baseado no arquivo JSON
      const initialStats = { totalPlayers: 1000 } // Valor do arquivo playerStats.json
      localStorage.setItem(this.localKey, JSON.stringify(initialStats))
      return initialStats
      
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
      return { totalPlayers: 1000 }
    }
  }

  // Simular incremento no servidor
  async incrementPlayerCount() {
    try {
      const currentStats = await this.getStats()
      const newStats = {
        ...currentStats,
        totalPlayers: currentStats.totalPlayers + 1,
        lastUpdated: new Date().toISOString()
      }
      
      // Em produção: await fetch(`${this.baseURL}/players/increment`, { method: 'POST' })
      localStorage.setItem(this.localKey, JSON.stringify(newStats))
      
      return newStats
    } catch (error) {
      console.error('Erro ao incrementar contador:', error)
      throw error
    }
  }

  // Simular reset das estatísticas (apenas para desenvolvimento)
  async resetStats() {
    try {
      const resetStats = { totalPlayers: 1000, lastUpdated: new Date().toISOString() }
      localStorage.setItem(this.localKey, JSON.stringify(resetStats))
      return resetStats
    } catch (error) {
      console.error('Erro ao resetar estatísticas:', error)
      throw error
    }
  }
}

export const statsAPI = new StatsAPI()

// Serviço principal para usar no componente
export const PlayerStatsService = {
  getStats: () => statsAPI.getStats(),
  incrementPlayerCount: () => statsAPI.incrementPlayerCount(),
  resetStats: () => statsAPI.resetStats()
}
