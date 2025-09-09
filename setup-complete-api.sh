#!/bin/bash

echo "🚀 SCRIPT COMPLETO - Configuração da API SerieJournal"
echo "===================================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Verificar pré-requisitos
echo -e "${BLUE}1️⃣ Verificando pré-requisitos...${NC}"
echo ""

if ! command_exists git; then
    echo -e "${RED}❌ Git não encontrado. Instale o Git primeiro.${NC}"
    echo "   macOS: brew install git"
    echo "   ou baixe de: https://git-scm.com/"
    exit 1
fi

if ! command_exists node; then
    echo -e "${RED}❌ Node.js não encontrado. Instale o Node.js primeiro.${NC}"
    echo "   Baixe de: https://nodejs.org/"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm não encontrado. Instale o npm primeiro.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git: $(git --version)${NC}"
echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"
echo ""

# Verificar se a porta 5000 está livre
echo -e "${BLUE}2️⃣ Verificando porta 5000...${NC}"
PORT_CHECK=$(lsof -i :5000 2>/dev/null)
if [ ! -z "$PORT_CHECK" ]; then
    echo -e "${YELLOW}⚠️  Processo rodando na porta 5000:${NC}"
    echo "$PORT_CHECK"
    echo ""
    echo -e "${YELLOW}Deseja parar o processo? (y/n):${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        PID=$(lsof -ti :5000)
        kill -9 $PID 2>/dev/null
        echo -e "${GREEN}✅ Processo parado${NC}"
    fi
else
    echo -e "${GREEN}✅ Porta 5000 está livre${NC}"
fi
echo ""

# Criar diretório de trabalho
echo -e "${BLUE}3️⃣ Configurando diretório de trabalho...${NC}"
WORK_DIR="/Users/pedrobarros/Documents/www"
mkdir -p "$WORK_DIR"
cd "$WORK_DIR"
echo -e "${GREEN}✅ Diretório: $WORK_DIR${NC}"
echo ""

# Clonar repositório da API
echo -e "${BLUE}4️⃣ Configurando repositório da API...${NC}"
if [ ! -d "DesenvolvimentoFrontend" ]; then
    echo -e "${YELLOW}📥 Clonando repositório...${NC}"
    git clone https://github.com/adsPucrsOnline/DesenvolvimentoFrontend.git
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Repositório clonado com sucesso${NC}"
    else
        echo -e "${RED}❌ Erro ao clonar repositório${NC}"
        echo -e "${YELLOW}💡 Tente clonar manualmente:${NC}"
        echo "   cd $WORK_DIR"
        echo "   git clone https://github.com/adsPucrsOnline/DesenvolvimentoFrontend.git"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Repositório já existe${NC}"
    cd DesenvolvimentoFrontend
    echo -e "${YELLOW}🔄 Atualizando repositório...${NC}"
    git pull origin main 2>/dev/null || echo -e "${YELLOW}⚠️  Não foi possível atualizar (pode estar em uma branch diferente)${NC}"
    cd ..
fi
echo ""

# Verificar estrutura da API
echo -e "${BLUE}5️⃣ Verificando estrutura da API...${NC}"
API_DIR="$WORK_DIR/DesenvolvimentoFrontend/readingJournal-api"

if [ ! -d "$API_DIR" ]; then
    echo -e "${RED}❌ Diretório da API não encontrado!${NC}"
    echo "   Esperado: $API_DIR"
    echo ""
    echo -e "${YELLOW}💡 Verificando estrutura disponível:${NC}"
    ls -la "$WORK_DIR/DesenvolvimentoFrontend/" 2>/dev/null || echo "Diretório não existe"
    exit 1
fi

if [ ! -f "$API_DIR/package.json" ]; then
    echo -e "${RED}❌ package.json da API não encontrado!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Estrutura da API verificada${NC}"
echo "   📁 $API_DIR"
echo ""

# Instalar dependências da API
echo -e "${BLUE}6️⃣ Instalando dependências da API...${NC}"
cd "$API_DIR"

echo -e "${YELLOW}📦 Executando npm install...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependências instaladas com sucesso${NC}"
else
    echo -e "${RED}❌ Erro ao instalar dependências${NC}"
    echo -e "${YELLOW}💡 Tente executar manualmente:${NC}"
    echo "   cd $API_DIR"
    echo "   npm install"
    exit 1
fi
echo ""

# Verificar scripts disponíveis
echo -e "${BLUE}7️⃣ Verificando scripts disponíveis...${NC}"
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ Scripts disponíveis:${NC}"
    cat package.json | grep -A 10 '"scripts"' || echo "Scripts não encontrados"
fi
echo ""

echo -e "${GREEN}🎉 CONFIGURAÇÃO COMPLETA!${NC}"
echo "=========================="
echo ""
echo -e "${BLUE}🚀 Para iniciar a API:${NC}"
echo "   cd $API_DIR"
echo "   npm start"
echo ""
echo -e "${BLUE}🌐 Para iniciar o Frontend (em outro terminal):${NC}"
echo "   cd /Users/pedrobarros/Documents/www/pedro-barros-projeto-fase-1"
echo "   npm run dev"
echo ""
echo -e "${YELLOW}📋 Após iniciar a API:${NC}"
echo "   • API estará em: http://localhost:5000"
echo "   • Teste: http://localhost:5000/series"
echo "   • Frontend estará em: http://localhost:5173"
echo ""
echo -e "${GREEN}✨ A aplicação mostrará 'API Conectada' quando tudo estiver funcionando!${NC}"
echo ""

# Perguntar se deve iniciar a API
echo -e "${YELLOW}Deseja iniciar a API agora? (y/n):${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo ""
    echo -e "${GREEN}🚀 INICIANDO A API...${NC}"
    echo "================================"
    echo "Pressione Ctrl+C para parar o servidor"
    echo ""
    npm start
fi