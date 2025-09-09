#!/bin/bash

echo "🔍 Diagnóstico do Erro HTTP 403"
echo "================================="
echo ""

# Verificar se a porta 5000 está ocupada
echo "1. Verificando porta 5000..."
PORT_CHECK=$(lsof -i :5000 2>/dev/null)
if [ -z "$PORT_CHECK" ]; then
    echo "❌ Nenhum processo rodando na porta 5000"
    echo "   → Este é o motivo do erro HTTP 403!"
else
    echo "✅ Processo encontrado na porta 5000:"
    echo "$PORT_CHECK"
fi
echo ""

# Verificar se o diretório da API existe
echo "2. Verificando se a API foi clonada..."
if [ -d "/Users/pedrobarros/Documents/www/DesenvolvimentoFrontend" ]; then
    echo "✅ Diretório da API encontrado"
    
    if [ -d "/Users/pedrobarros/Documents/www/DesenvolvimentoFrontend/readingJournal-api" ]; then
        echo "✅ Diretório da API específica encontrado"
        
        # Verificar se tem package.json
        if [ -f "/Users/pedrobarros/Documents/www/DesenvolvimentoFrontend/readingJournal-api/package.json" ]; then
            echo "✅ package.json da API encontrado"
        else
            echo "❌ package.json da API não encontrado"
        fi
    else
        echo "❌ Diretório readingJournal-api não encontrado"
    fi
else
    echo "❌ Diretório da API não encontrado"
    echo "   → Precisa clonar o repositório!"
fi
echo ""

# Verificar se Node.js está instalado
echo "3. Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js instalado: $NODE_VERSION"
else
    echo "❌ Node.js não encontrado"
fi
echo ""

# Verificar se npm está instalado
echo "4. Verificando npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm instalado: $NPM_VERSION"
else
    echo "❌ npm não encontrado"
fi
echo ""

echo "🔧 SOLUÇÃO RECOMENDADA:"
echo "======================="
echo ""

if [ -z "$PORT_CHECK" ]; then
    echo "O erro HTTP 403 ocorre porque a API não está rodando."
    echo "Para resolver:"
    echo ""
    echo "1. Execute o script de setup da API:"
    echo "   ./setup-api.sh"
    echo ""
    echo "OU execute manualmente:"
    echo ""
    echo "2. Clone a API (se ainda não foi feito):"
    echo "   cd /Users/pedrobarros/Documents/www"
    echo "   git clone https://github.com/adsPucrsOnline/DesenvolvimentoFrontend.git"
    echo ""
    echo "3. Instale e inicie a API:"
    echo "   cd DesenvolvimentoFrontend/readingJournal-api/"
    echo "   npm install"
    echo "   npm start"
    echo ""
    echo "4. Em outro terminal, inicie o frontend:"
    echo "   cd /Users/pedrobarros/Documents/www/pedro-barros-projeto-fase-1"
    echo "   npm run dev"
    echo ""
    echo "✨ Após isso, você verá o indicador 'API Conectada' na aplicação!"
else
    echo "✅ A API parece estar rodando!"
    echo "Teste acessando: http://localhost:5000/series"
fi