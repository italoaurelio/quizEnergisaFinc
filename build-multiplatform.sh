#!/bin/bash

echo "🚀 Gerando executáveis para múltiplas plataformas..."
echo ""

# Linux (AppImage)
echo "📱 Gerando AppImage para Linux..."
npx electron-builder --config electron-builder.json --linux AppImage
echo "✅ AppImage gerado!"
echo ""

# Tentar Windows se possível
echo "🪟 Tentando gerar executável para Windows..."
if npx electron-builder --config electron-builder.json --win portable --x64 2>/dev/null; then
    echo "✅ Executável Windows gerado!"
else
    echo "⚠️  Compilação para Windows requer ambiente Windows ou Wine configurado"
    echo "💡 Alternativas:"
    echo "   1. Use GitHub Actions para compilação automática"
    echo "   2. Execute em uma máquina Windows"
    echo "   3. Use um serviço de CI/CD"
fi

echo ""
echo "📁 Arquivos gerados em: ./release/"
ls -la release/ 2>/dev/null || echo "Nenhum arquivo encontrado"
