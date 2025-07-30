# Sistema de Estatísticas de Jogadores

## Funcionamento Atual (Desenvolvimento)

O sistema atualmente simula uma API que mantém as estatísticas dos jogadores que completaram o quiz. 

### Arquivos Importantes:

1. **`/src/data/playerStats.json`** - Contém o valor inicial das estatísticas (1000 jogadores)
2. **`/src/services/statsAPI.js`** - Simula uma API que gerencia as estatísticas
3. **App.jsx** - Integra o sistema de estatísticas com o quiz

### Como Funciona:

1. **Carregamento Inicial**: Ao abrir a aplicação, as estatísticas são carregadas
2. **Incremento**: Quando um jogador completa o quiz, o contador é incrementado em +1
3. **Persistência**: As estatísticas são salvas localmente para simular persistência entre sessões

## Implementação em Produção

Para que as estatísticas sejam realmente consistentes entre dispositivos, você precisará:

### Backend (API Real)

```javascript
// Exemplo de endpoints necessários:
GET /api/stats/players - Obter estatísticas atuais
POST /api/stats/players/increment - Incrementar contador
```

### Banco de Dados

```sql
CREATE TABLE player_stats (
  id INT PRIMARY KEY,
  total_players INT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Frontend

O código atual já está preparado para produção. Basta alterar o arquivo `statsAPI.js` para fazer chamadas reais:

```javascript
// Em produção, substituir por:
async getStats() {
  const response = await fetch('/api/stats/players')
  return await response.json()
}

async incrementPlayerCount() {
  const response = await fetch('/api/stats/players/increment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  return await response.json()
}
```

## Estrutura dos Dados

```json
{
  "totalPlayers": 1000,
  "lastUpdated": "2025-07-30T10:00:00Z"
}
```

## Recursos Implementados

- ✅ Contador na página inicial (canto superior direito)
- ✅ Contador na página de resultados
- ✅ Incremento automático ao completar o quiz
- ✅ Persistência local (simulando API)
- ✅ Tratamento de erros
- ✅ Formatação de números (ex: 1.000 ao invés de 1000)

## Próximos Passos para Produção

1. Implementar backend/API real
2. Configurar banco de dados
3. Implementar autenticação (se necessário)
4. Adicionar analytics mais detalhados (opcional)
5. Implementar cache para otimização
