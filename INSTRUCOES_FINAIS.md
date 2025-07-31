# 🎯 INSTRUÇÕES FINAIS - QUIZ ENERGISA FINC

## ✅ **CONFIGURAÇÃO OTIMIZADA PARA WINDOWS**

### 🪟 **Para gerar executável Windows:**

**Opção 1 - Script Automático (Windows):**
```cmd
build-windows.bat
```

**Opção 2 - Comandos manuais (Windows):**
```cmd
npm install
npm run build
npm run dist:win
```

**Opção 3 - GitHub Actions (qualquer plataforma):**
1. Faça push para o GitHub
2. Vá em Actions → Execute "Build Electron App"
3. Baixe o artefato Windows

### 📱 **Para Linux (já funciona):**
```bash
npm run dist:linux
```

## 📦 **Arquivos Gerados:**

- **Linux**: `Quiz Energisa FINC-1.0.0.AppImage`
- **Windows**: `Quiz Energisa FINC-1.0.0-Windows.exe`

## 🔧 **Configuração Final:**

✅ **Simplificada** - Removido macOS, focado Windows/Linux  
✅ **Executável portável** - Não precisa instalação  
✅ **Scripts automáticos** - `.bat` e `.ps1` para Windows  
✅ **GitHub Actions** - Build automático na nuvem  
✅ **Imagens funcionando** - Logos carregando corretamente  

## 🚀 **Para distribuir:**

1. **Windows**: Envie o arquivo `.exe` - funciona sem instalação
2. **Linux**: Envie o arquivo `.AppImage` - já testado e funcionando

## 💡 **Dica:**
Use o GitHub Actions para gerar executáveis Windows automaticamente, sem precisar de máquina Windows local!
