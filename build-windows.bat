@echo off
echo 🚀 Gerando executável para Windows...
echo.

REM Limpar builds anteriores
if exist "dist" rmdir /s /q "dist"
if exist "release" rmdir /s /q "release"

echo 📦 Instalando dependências...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b %errorlevel%
)

echo 🔧 Fazendo build do React...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build do React
    pause
    exit /b %errorlevel%
)

echo 🪟 Gerando executável Windows...
call npx electron-builder --config electron-builder.json --win
if %errorlevel% neq 0 (
    echo ❌ Erro ao gerar executável
    pause
    exit /b %errorlevel%
)

echo.
echo ✅ Sucesso! Executável gerado em: release\
dir release\*.exe
echo.
echo 🎉 Pronto para usar!
pause
