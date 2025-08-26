# Pedro Barros - Projeto Fase 1

## 📋 Descrição do Projeto

O **SeriesManager** é uma aplicação web desenvolvida em React que permite aos usuários gerenciar suas séries assistidas de forma organizada e eficiente. Este projeto atende completamente aos requisitos da **Fase 1**, implementando todas as funcionalidades solicitadas no enunciado.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para execução:

1. **Extraia o arquivo pedro-barros-projeto-fase-1.zip**
2. **Navegue até a pasta do projeto:**
   ```bash
   cd pedro-barros-projeto-fase-1
   ```
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Execute o projeto em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
5. **Acesse a aplicação:**
   - Abra seu navegador e acesse: `http://localhost:5173/`

### Scripts Disponíveis:
- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter ESLint

### Como Executar Testes:
Atualmente o projeto não possui testes implementados. Esta funcionalidade será adicionada em fases futuras do projeto.

## 🎯 Requisitos da Fase 1 - Cumprimento Completo

### ✅ Requisitos Obrigatórios Atendidos:

1. **✅ Projeto React criado:** Utilizado **Vite** como ferramenta de criação e desenvolvimento
2. **✅ Componentes de entrada de dados:** Formulário completo implementado no **SerieForm**
3. **✅ Validação básica e feedbacks visuais:** Validação em tempo real com mensagens de erro
4. **✅ Funcionalidades dinâmicas CRUD estático:** Listagem, busca, criação, atualização e exclusão
5. **✅ Componentização obrigatória:** **SerieList**, **SerieForm** e **NavBar** implementados
6. **✅ Estrutura de pastas:** Organização conforme especificado no enunciado

### ✅ Estrutura de Projeto Conforme Solicitado:

```
pedro-barros-projeto-fase-1/
├── README.md                    # Esta documentação
├── package.json                 # Dependências e scripts
├── index.html                   # HTML principal
├── vite.config.js              # Configuração do Vite
├── eslint.config.js            # Configuração do ESLint
├── public/                      # Arquivos públicos
│   └── vite.svg
└── src/                         # Código fonte principal
    ├── App.jsx                  # Componente principal com roteamento
    ├── App.css                  # Estilos globais
    ├── main.jsx                 # Ponto de entrada da aplicação
    ├── index.css                # Estilos base
    ├── assets/
    │   └── react.svg
    └── components/              # Pasta de componentes
        ├── NavBar/              # Componente de navegação
        │   ├── NavBar.jsx
        │   └── NavBar.css
        ├── SerieForm/           # Componente de formulário
        │   ├── SerieForm.jsx
        │   └── SerieForm.css
        └── SerieList/           # Componente de listagem
            ├── SerieList.jsx
            └── SerieList.css
```

## 🧩 Componentes Obrigatórios - Descrição Detalhada

### **NavBar** (Componente de Navegação)
**Função:** Componente de navegação principal que permite acesso a todas as seções da aplicação.

**O que realiza:**
- Fornece links para navegação entre páginas (Início, Sobre, Cadastrar Série, Listar Séries)
- Mantém layout fixo no topo da página
- Adapta-se responsivamente a diferentes tamanhos de tela
- Utiliza React Router DOM para navegação SPA (Single Page Application)

### **SerieForm** (Componente de Formulário)
**Função:** Componente responsável pelo cadastro e edição de séries.

**O que realiza:**
- **Campos obrigatórios implementados:**
  - Título da série
  - Número de Temporadas
  - Data de Lançamento da Temporada
  - Diretor
  - Produtora
  - Categoria (seleção via dropdown)
  - Data em que assistiu
- **Validação completa:** Todos os campos são validados em tempo real
- **Feedback visual:** Bordas vermelhas e mensagens de erro para campos inválidos
- **Modo dual:** Funciona para criação de novas séries e edição de existentes
- **Props recebidas:** `onSubmit`, `editingSerie`, `onCancel`

### **SerieList** (Componente de Listagem)
**Função:** Componente que exibe e gerencia a lista de séries cadastradas.

**O que realiza:**
- **Recebe lista via props:** Aceita array de séries como propriedade
- **Exibição em cards:** Layout visual atrativo com todas as informações da série
- **Funcionalidade de busca:** Permite buscar por título, diretor ou produtora
- **Filtro por categoria:** Dropdown para filtrar séries por categoria
- **Ações de gerenciamento:** Botões para editar e excluir cada série
- **Contador dinâmico:** Mostra total de séries encontradas
- **Estado vazio:** Exibe mensagem quando não há séries cadastradas
- **Props recebidas:** `series`, `onEdit`, `onDelete`

## 📱 Páginas Implementadas (Conforme Sugestão do Enunciado)

### 1. **Página Inicial** (/)
- Página de recepção ao usuário conforme solicitado
- Apresentação do projeto com cards informativos
- Estatísticas dinâmicas das séries cadastradas

### 2. **Página Informativa - "Sobre"** (/sobre)
- Página informativa sobre o projeto
- Descrição das tecnologias utilizadas
- Informações do desenvolvedor

### 3. **Página de Cadastro** (/cadastrar)
- Contém o formulário de inclusão de novas séries
- Implementa todos os campos obrigatórios especificados
- Validação completa conforme requisitos

### 4. **Página de Listagem** (/series)
- Lista séries cadastradas com todas as informações
- Possibilidade de exclusão e edição através de botões
- Funcionalidades de busca e filtro implementadas

## 🎨 Funcionalidades Dinâmicas Implementadas

### **Operações CRUD Estáticas:**
- **✅ CREATE:** Adição de novas séries através do formulário
- **✅ READ:** Listagem e visualização de séries cadastradas
- **✅ UPDATE:** Edição de séries existentes (pré-preenchimento do formulário)
- **✅ DELETE:** Exclusão de séries com confirmação do usuário

### **Funcionalidades de Busca e Filtro:**
- **✅ Busca dinâmica:** Por título, diretor ou produtora
- **✅ Filtro por categoria:** Dropdown com todas as categorias disponíveis
- **✅ Contagem dinâmica:** Total de séries exibidas após filtros

### **Validação e Feedback:**
- **✅ Validação em tempo real:** Campos validados ao perder o foco (onBlur)
- **✅ Feedback visual:** Bordas coloridas e mensagens de erro
- **✅ Confirmações:** Dialog de confirmação antes de excluir séries

## 🛠️ Tecnologias Utilizadas

- **React** 19.1.1 - Biblioteca JavaScript para interfaces de usuário
- **React Router DOM** 7.8.2 - Roteamento para aplicações React SPA
- **Vite** 7.1.2 - Ferramenta de build rápida e moderna (alternativa ao Create React App)
- **CSS3** - Estilização com design responsivo e moderno
- **JavaScript ES6+** - Linguagem de programação com recursos modernos
- **ESLint** - Linter para qualidade de código

## 📊 Dados Pré-cadastrados para Demonstração

A aplicação inclui séries de exemplo para demonstrar o funcionamento:

1. **Breaking Bad**
   - Temporadas: 5
   - Lançamento: 20/01/2008
   - Diretor: Vince Gilligan
   - Produtora: Sony Pictures
   - Categoria: Drama
   - Assistida em: 15/06/2023

2. **Stranger Things**
   - Temporadas: 4
   - Lançamento: 15/07/2016
   - Diretor: The Duffer Brothers
   - Produtora: Netflix
   - Categoria: Ficção Científica
   - Assistida em: 20/08/2023
   
## 📝 Decisões de Desenvolvimento

### **Escolhas Técnicas Justificadas:**

1. **Vite ao invés de Create React App:** 
   - Desenvolvimento mais rápido com Hot Module Replacement otimizado
   - Build de produção mais eficiente
   - Configuração mais simples e moderna

2. **Estrutura de componentes em pastas separadas:**
   - Organização conforme especificado no enunciado
   - Facilita manutenção e escalabilidade
   - CSS isolado por componente

3. **Estado local com useState:**
   - Implementação estática conforme requisitos da Fase 1
   - Preparação para integração futura com APIs
   - Gerenciamento simples e efetivo

4. **Validação no cliente:**
   - Feedback imediato ao usuário
   - Melhor experiência de uso
   - Validação robusta de todos os campos obrigatórios

5. **Design responsivo completo:**
   - Funciona perfeitamente em todos os dispositivos
   - Interface moderna e profissional
   - Usabilidade otimizada para mobile e desktop

## 👨‍💻 Informações do Desenvolvedor

**Nome:** Pedro Barros  
**Projeto:** Fase 1 - Gerenciador de Séries  
**Data de Entrega:** Agosto 2025  
**Tecnologia Principal:** React com Vite

---

## 📋 Checklist de Entrega - Fase 1

- ✅ Projeto React funcional criado
- ✅ Todos os componentes obrigatórios implementados (SerieList, SerieForm, NavBar)
- ✅ Estrutura de pastas conforme especificação
- ✅ Formulário com todos os campos obrigatórios
- ✅ Validação e feedback visual implementados
- ✅ Funcionalidades CRUD estáticas funcionando
- ✅ Páginas sugeridas criadas (inicial, sobre, cadastro, listagem)
- ✅ Interface responsiva e profissional
- ✅ README.md completo com instruções
- ✅ Projeto zipado sem node_modules
- ✅ Nome do arquivo: pedro-barros-projeto-fase-1.zip
