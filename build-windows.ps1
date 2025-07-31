Write-Host "🚀 Gerando executável para Windows..." -ForegroundColor Green
Write-Host ""

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro." -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Limpar builds anteriores
Write-Host "🧹 Limpando builds anteriores..." -ForegroundColor Yellow
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
if (Test-Path "release") { Remove-Item -Recurse -Force "release" }

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
try {
    npm install
    if ($LASTEXITCODE -ne 0) { throw "Erro na instalação" }
    Write-Host "✅ Dependências instaladas" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao instalar dependências" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Build do React
Write-Host "🔧 Fazendo build do React..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Erro no build" }
    Write-Host "✅ Build do React concluído" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro no build do React" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Gerar executável
Write-Host "🪟 Gerando executável Windows..." -ForegroundColor Yellow
try {
    npm run dist:win
    if ($LASTEXITCODE -ne 0) { throw "Erro na geração" }
    Write-Host "✅ Executável gerado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao gerar executável" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Mostrar resultado
Write-Host ""
Write-Host "📁 Arquivos gerados em: release\" -ForegroundColor Cyan
Get-ChildItem -Path "release" -Filter "*.exe" | ForEach-Object {
    $size = [math]::Round($_.Length / 1MB, 2)
    Write-Host "   📄 $($_.Name) ($size MB)" -ForegroundColor White
}

Write-Host ""
Write-Host "🎉 Pronto para usar! Execute o arquivo .exe para testar." -ForegroundColor Green
Read-Host "Pressione Enter para sair"
