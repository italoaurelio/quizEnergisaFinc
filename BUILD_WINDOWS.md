# 🚀 Como Gerar Executáveis para Windows

## 📋 Opções Disponíveis

### 1. 🤖 **GitHub Actions (Recomendado)**
A forma mais fácil é usar o GitHub Actions que configurei:

1. **Faça push do código para o GitHub**:
   ```bash
   git add .
   git commit -m "Setup para build Windows"
   git push origin master
   ```

2. **Execute o workflow**:
   - Vá para seu repositório no GitHub
   - Clique na aba "Actions"
   - Execute o workflow "Build Electron App"
   - Baixe os artefatos gerados

### 2. 💻 **Em uma Máquina Windows**
Se você tiver acesso a uma máquina Windows:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/quizEnergisaFinc.git
cd quizEnergisaFinc

# Instale dependências
npm install

# Gere executável para Windows
npm run dist:win
```

### 3. 🐳 **Usando Docker (Linux)**
Alternativa usando Docker no Linux:

```bash
# Instalar Docker se não tiver
sudo apt install docker.io

# Usar imagem com Wine pré-configurado
docker run --rm -ti \
  --env-file <(env | grep -iE 'DEBUG|NODE_|ELECTRON_|YARN_|NPM_|CI|CIRCLE|TRAVIS_TAG|TRAVIS|TRAVIS_REPO_|TRAVIS_BUILD_|TRAVIS_BRANCH|TRAVIS_PULL_REQUEST_|APPVEYOR_|CSC_|GH_|GITHUB_|BT_|AWS_|STRIP|BUILD_') \
  --env ELECTRON_CACHE="/root/.cache/electron" \
  --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
  -v ${PWD}:/project \
  -v ${PWD##*/}-node-modules:/project/node_modules \
  -v ~/.cache/electron:/root/.cache/electron \
  -v ~/.cache/electron-builder:/root/.cache/electron-builder \
  electronuserland/builder:wine \
  /bin/bash -c "npm install && npm run dist:win"
```

## 📦 **Scripts Disponíveis**

- `npm run dist` - Gera para Linux (AppImage)
- `npm run dist:linux` - Gera para Linux
- `npm run dist:win` - Gera para Windows (requer Windows ou Wine)
- `npm run dist:mac` - Gera para macOS (requer macOS)
- `npm run dist:all` - Tenta gerar para todas as plataformas

## 📁 **Arquivos Gerados**

Após o build, os arquivos ficam em `release/`:

### Windows:
- `Quiz Energisa FINC Setup 1.0.0.exe` - Instalador NSIS
- `Quiz Energisa FINC 1.0.0.exe` - Executável portável

### Linux:
- `Quiz Energisa FINC-1.0.0.AppImage` - AppImage (já funciona!)

### macOS:
- `Quiz Energisa FINC-1.0.0.dmg` - Instalador DMG

## 🔧 **Configurações**

As configurações estão em `electron-builder.json`:
- ✅ Windows: NSIS installer + Portable
- ✅ Linux: AppImage 
- ✅ macOS: DMG
- ✅ Ícones configurados
- ✅ Atalhos na área de trabalho
- ✅ Menu Iniciar

## 🎯 **Recomendação**

Para distribuição profissional, use o **GitHub Actions** - é automático e gera para todas as plataformas sem precisar de máquinas específicas!

## 📞 **Ajuda**

Se precisar de ajuda:
1. Execute `./build-multiplatform.sh` para ver o status
2. Verifique os logs do GitHub Actions
3. Use o Docker se tiver experiência com containers
