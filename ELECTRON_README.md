# Quiz Energisa FINC - Aplicativo Desktop

Este é um aplicativo desktop construído com Electron e React para o Quiz da Energisa FINC.

## 🚀 Como executar

### Desenvolvimento
Para executar o aplicativo em modo de desenvolvimento:

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento (com DevTools)
npm run electron-dev
```

### Build para produção
Para gerar o executável do aplicativo:

```bash
# Build do aplicativo React + Electron
npm run dist
```

Os arquivos de distribuição serão criados na pasta `release/`.

## 📦 Scripts disponíveis

- `npm run dev` - Executa apenas o frontend React (modo web)
- `npm run electron` - Executa o Electron (precisa do build primeiro)
- `npm run electron-dev` - Executa em modo desenvolvimento
- `npm run build` - Faz o build do frontend React
- `npm run dist` - Gera o executável final
- `npm run electron-pack` - Empacota o aplicativo

## 🖥️ Plataformas suportadas

O aplicativo pode ser compilado para:
- **Linux**: AppImage e DEB
- **Windows**: NSIS Installer
- **macOS**: DMG

## 📁 Estrutura do projeto

```
├── electron.js          # Arquivo principal do Electron
├── package.json         # Configurações do projeto
├── vite.config.js       # Configurações do Vite
├── src/                 # Código fonte React
├── public/              # Arquivos públicos e ícones
└── release/             # Executáveis gerados (após build)
```

## 🔧 Configurações

As configurações do Electron Builder estão no `package.json` na seção `build`.

## 📝 Notas importantes

- O aplicativo usa o ícone `public/EnergisaLogo.png` como ícone da aplicação
- Em desenvolvimento, o DevTools abre automaticamente
- A aplicação é configurada com segurança adequada (sem nodeIntegration)
- O menu da aplicação inclui atalhos úteis (F5 para recarregar, F11 para tela cheia, etc.)
