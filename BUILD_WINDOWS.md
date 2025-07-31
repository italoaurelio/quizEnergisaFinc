# 🪟 Como Gerar Executável para Windows

## 🎯 **Método Mais Simples (Windows)**

### 1. **Script Automático (.bat)**
No Windows, simplesmente execute:
```cmd
build-windows.bat
```
Ou clique duas vezes no arquivo `build-windows.bat`

### 2. **Script PowerShell (.ps1)**
No PowerShell:
```powershell
.\build-windows.ps1
```

### 3. **Comandos Manuais**
```cmd
npm install
npm run build
npm run dist:win
```

## 📋 **Pré-requisitos**

1. **Node.js** - Baixe em: https://nodejs.org/
2. **Git** (opcional) - Para clonar o repositório

## 🚀 **Passo a Passo Completo**

### Windows (Máquina local):

1. **Clone o repositório**:
   ```cmd
   git clone https://github.com/italoaurelio/quizEnergisaFinc.git
   cd quizEnergisaFinc
   ```

2. **Execute o script automático**:
   ```cmd
   build-windows.bat
   ```

3. **Encontre o executável**: `release\Quiz Energisa FINC-1.0.0-Windows.exe`

## 🤖 **GitHub Actions (Automático)**

Alternativa sem precisar de máquina Windows:

1. **Faça push para o GitHub**:
   ```bash
   git add .
   git commit -m "Build para Windows"
   git push origin master
   ```

2. **Vá para Actions no GitHub** e baixe o artefato gerado

## � **Arquivo Gerado**

- **Nome**: `Quiz Energisa FINC-1.0.0-Windows.exe`
- **Tipo**: Executável portável (não precisa instalar)
- **Tamanho**: ~150-200 MB
- **Funcionamento**: Duplo clique para executar

## 🔧 **Configuração Otimizada**

✅ **Simplificado**: Apenas executável portável  
✅ **Sem instalador**: Não precisa de privilégios administrativos  
✅ **Ícone**: Logo da Energisa incluído  
✅ **Compatibilidade**: Windows 10/11 x64  

## ❌ **Problemas Comuns**

### "npm não é reconhecido"
- Instale o Node.js: https://nodejs.org/

### "Erro de permissão PowerShell"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Erro no build"
```cmd
npm cache clean --force
npm install
```

## 📞 **Suporte**

Se der problema:
1. Execute `build-windows.bat` (mais detalhado)
2. Use o GitHub Actions como alternativa
3. Verifique se o Node.js está instalado

## 🎯 **Resultado Final**

Arquivo executável que pode ser distribuído para qualquer máquina Windows sem necessidade de instalação! 🚀
