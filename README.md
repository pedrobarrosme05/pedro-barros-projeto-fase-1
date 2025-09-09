# SeriesManager - Projeto Fase 2

> Aplicação web para gerenciamento de séries assistidas desenvolvida em React com Material-UI

## 🚀 Funcionalidades

- ✅ **Página Inicial**: Dashboard com estatísticas e visão geral
- ✅ **Página Sobre**: Informações do projeto e tecnologias utilizadas
- ✅ **Cadastro de Séries**: Formulário completo com validação
- ✅ **Listagem de Séries**: Visualização com busca e filtros avançados
- ✅ **Edição e Exclusão**: Operações CRUD completas
- ✅ **Interface Responsiva**: Design adaptável com Material-UI
- ✅ **Consumo de API REST**: Integração com backend
- ✅ **Testes Unitários**: Cobertura completa dos componentes

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** 19.1.1 - Biblioteca para interfaces de usuário
- **Material-UI** 6.1.8 - Biblioteca de componentes
- **React Router** 7.8.2 - Roteamento de páginas
- **Axios** 1.7.9 - Cliente HTTP para API
- **Day.js** - Manipulação de datas
- **Date Pickers** - Seletores de data avançados

### Desenvolvimento
- **Vite** 7.1.2 - Build tool e servidor de desenvolvimento
- **Vitest** 3.2.4 - Framework de testes
- **Testing Library** - Utilitários para testes
- **ESLint** - Linter para qualidade de código

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

### 🔧 SOLUÇÃO PARA ERRO HTTP 403

Se você está recebendo o erro "Access to localhost was denied - HTTP ERROR 403", isso significa que a API não está rodando. Siga os passos abaixo:

#### Opção 1: Script Automatizado (Recomendado)
```bash
# No diretório do projeto frontend
cd /Users/pedrobarros/Documents/www/pedro-barros-projeto-fase-1
./setup-api.sh
```

#### Opção 2: Configuração Manual
```bash
# 1. Clone o repositório da API (se ainda não fez)
cd /Users/pedrobarros/Documents/www
git clone https://github.com/adsPucrsOnline/DesenvolvimentoFrontend.git

# 2. Entre no diretório da API
cd DesenvolvimentoFrontend/readingJournal-api/

# 3. Instale as dependências
npm install

# 4. Inicie a API
npm start
```

### ✅ Verificação da API
Após iniciar a API, você deve ver uma mensagem similar a:
```
Server running on port 5000
```

Teste se está funcionando acessando: http://localhost:5000/series

### 🌐 Executando o Frontend

Em um **novo terminal**, execute:
```bash
cd /Users/pedrobarros/Documents/www/pedro-barros-projeto-fase-1
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### 1. Clone o projeto
```bash
git clone <url-do-repositorio>
cd pedro-barros-projeto-fase-2
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a API
Certifique-se de que a API está rodando em `http://localhost:5000`:

```bash
# Em outro terminal, clone e execute a API
git clone https://github.com/adsPucrsOnline/DesenvolvimentoFrontend.git
cd DesenvolvimentoFrontend/readingJournal-api/
npm install
npm start
```

### 4. Execute o projeto
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🧪 Executando os Testes

### Testes unitários
```bash
npm run test
```

### Testes em modo watch
```bash
npm run test:ui
```

### Executar testes uma vez
```bash
npm run test:run
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── __tests__/       # Testes dos componentes
│   ├── AboutPage/       # Página sobre
│   ├── HomePage/        # Página inicial
│   ├── NavBar/          # Barra de navegação
│   ├── SerieForm/       # Formulário de séries
│   └── SerieList/       # Lista de séries
├── services/            # Serviços de API
│   ├── __tests__/       # Testes dos serviços
│   └── seriesService.js # Serviço da API REST
├── test/                # Configuração de testes
├── App.jsx              # Componente principal
├── theme.js             # Tema Material-UI
└── main.jsx             # Ponto de entrada
```

## 🎯 Descrição dos Componentes

### HomePage
- Dashboard principal com estatísticas
- Preview das séries recentes
- Links para navegação rápida
- Cards informativos sobre funcionalidades

### AboutPage
- Informações detalhadas do projeto
- Lista de tecnologias utilizadas
- Arquitetura da aplicação
- Informações do desenvolvedor

### SerieForm
- Formulário para cadastro/edição de séries
- Validação completa dos campos
- Date pickers para datas
- Estados de loading e erro
- Integração com API

### SerieList
- Listagem responsiva das séries
- Sistema de busca por título, diretor ou produtora
- Filtros por categoria
- Botões de edição e exclusão
- Dialog de confirmação para exclusão
- Estados vazios informativos

### NavBar
- Navegação responsiva
- Menu mobile para telas pequenas
- Indicação da página ativa
- Design consistente com Material-UI

### seriesService
- Abstração da API REST
- Métodos para todas as operações CRUD
- Tratamento de erros
- Interceptors para requisições

## 🔧 Funcionalidades da API

O projeto consome as seguintes rotas da API:

- `GET /series` - Listar todas as séries
- `GET /series/:id` - Buscar série por ID
- `POST /series` - Criar nova série
- `PUT /series` - Atualizar série existente
- `DELETE /series/:id` - Remover série

### Estrutura de dados da série:
```json
{
  "id": 1,
  "titulo": "Breaking Bad",
  "numeroTemporadas": 5,
  "dataLancamento": "2008-01-20",
  "diretor": "Vince Gilligan",
  "produtora": "Sony Pictures",
  "categoria": "Drama",
  "dataAssistida": "2023-06-15"
}
```

## 🎨 Interface e UX

### Características do Design
- **Material Design**: Interface moderna e intuitiva
- **Responsividade**: Adaptável a dispositivos móveis e desktop
- **Acessibilidade**: Componentes acessíveis por padrão
- **Feedback Visual**: Loading states, alertas e confirmações
- **Navegação Fluida**: Transições suaves entre páginas

### Paleta de Cores
- **Primária**: Azul (#1976d2)
- **Secundária**: Rosa (#dc004e)
- **Sucesso**: Verde para ações positivas
- **Erro**: Vermelho para alertas e exclusões
- **Background**: Tons de cinza claro

## 🧪 Cobertura de Testes

### Componentes Testados
- ✅ **HomePage**: Renderização, navegação e estatísticas
- ✅ **SerieForm**: Validação, submissão e estados
- ✅ **SerieList**: Listagem, filtros e ações
- ✅ **seriesService**: Todas as operações da API

### Tipos de Teste
- **Unitários**: Componentes isolados
- **Integração**: Interação entre componentes
- **Mock**: Simulação de APIs e navegação

## 📱 Demonstração

### Telas Principais

1. **Página Inicial**
   - Dashboard com estatísticas
   - Cards de funcionalidades
   - Preview das séries

2. **Cadastro de Série**
   - Formulário completo
   - Validação em tempo real
   - Date pickers

3. **Lista de Séries**
   - Grid responsivo
   - Busca e filtros
   - Ações de edição/exclusão

4. **Página Sobre**
   - Informações do projeto
   - Tecnologias utilizadas
   - Créditos do desenvolvedor

## 👨‍💻 Desenvolvedor

**Pedro Barros**  
Projeto Fase 2 - Desenvolvimento Frontend  
PUCRS Online - 2025

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do curso de Desenvolvimento Frontend.

---

## 🚨 Troubleshooting

### Problemas Comuns

1. **API não conecta**
   - Verifique se a API está rodando em `http://localhost:5000`
   - Confirme se as dependências da API foram instaladas

2. **Testes falhando**
   - Execute `npm install` novamente
   - Verifique se todas as dependências de teste estão instaladas

3. **Build falha**
   - Limpe o cache: `npm cache clean --force`
   - Reinstale dependências: `rm -rf node_modules && npm install`

4. **Date Picker não funciona**
   - Verifique se o LocalizationProvider está configurado
   - Confirme a importação do AdapterDayjs

Para mais ajuda, consulte a documentação das tecnologias utilizadas ou entre em contato com o desenvolvedor.
