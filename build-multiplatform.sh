#!/bin/bash

echo "🚀 Gerando executáveis para Linux e Windows..."
echo ""

# Verificar se npm está disponível
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale Node.js primeiro."
    exit 1
fi

# Build do React
echo "🔧 Fazendo build do React..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro no build do React"
    exit 1
fi

# Linux (AppImage)
echo "📱 Gerando AppImage para Linux..."
npm run dist:linux
if [ $? -eq 0 ]; then
    echo "✅ AppImage gerado!"
else
    echo "❌ Erro ao gerar AppImage"
fi

echo ""
echo "🪟 Para Windows:"
echo "   - Execute 'build-windows.bat' no Windows"
echo "   - Ou use GitHub Actions para build automático"
echo "   - Ou execute: npm run dist:win (no Windows)"

echo ""
echo "📁 Arquivos gerados em: ./release/"
if [ -d "release" ]; then
    ls -la release/
else
    echo "Nenhum arquivo encontrado"
fi
