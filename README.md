# 🛍️ Ecommerce Inteligente para Pequenos Negócios

Aplicação completa de e-commerce com funcionalidades de Machine Learning para recomendações e ChatBot integrado.

## 📐 Planejamento de Requisitos

### Problema a Ser Resolvido

Pequenos negócios enfrentam dificuldades para competir com grandes e-commerces devido à falta de recursos tecnológicos avançados. Este sistema visa democratizar o acesso a tecnologias de inteligência artificial e machine learning, oferecendo:

- **Sistema de recomendações personalizadas** para aumentar vendas
- **ChatBot inteligente** para melhorar o atendimento ao cliente
- **Interface intuitiva** que não requer conhecimento técnico avançado
- **Solução completa e acessível** para pequenos empreendedores

### Público-Alvo

1. **Pequenos Empreendedores**
   - Donos de lojas físicas que querem expandir para o online
   - Artesãos e produtores independentes
   - Pequenos varejistas locais

2. **Características do Público-Alvo:**
   - Orçamento limitado para tecnologia
   - Necessidade de solução simples e intuitiva
   - Busca por aumento de vendas e engajamento
   - Necessidade de atendimento ao cliente eficiente

### Requisitos Funcionais

#### RF01 - Gestão de Usuários
- RF01.1: Sistema deve permitir cadastro de novos usuários
- RF01.2: Sistema deve permitir autenticação de usuários (login)
- RF01.3: Sistema deve diferenciar entre usuários comuns e administradores
- RF01.4: Sistema deve proteger rotas administrativas

#### RF02 - Gestão de Produtos
- RF02.1: Sistema deve permitir cadastro de produtos (admin)
- RF02.2: Sistema deve permitir listagem de produtos com filtros
- RF02.3: Sistema deve permitir busca de produtos por nome/descrição
- RF02.4: Sistema deve permitir ordenação de produtos (preço, nome, data)
- RF02.5: Sistema deve exibir detalhes completos do produto
- RF02.6: Sistema deve gerenciar estoque de produtos

#### RF03 - Carrinho de Compras
- RF03.1: Sistema deve permitir adicionar produtos ao carrinho
- RF03.2: Sistema deve permitir remover produtos do carrinho
- RF03.3: Sistema deve permitir atualizar quantidades no carrinho
- RF03.4: Sistema deve calcular total do carrinho automaticamente
- RF03.5: Sistema deve persistir carrinho no navegador

#### RF04 - Gestão de Pedidos
- RF04.1: Sistema deve permitir criação de pedidos
- RF04.2: Sistema deve validar estoque antes de criar pedido
- RF04.3: Sistema deve atualizar estoque após pedido
- RF04.4: Sistema deve permitir visualização de histórico de pedidos
- RF04.5: Sistema deve permitir atualização de status do pedido (admin)

#### RF05 - Sistema de Recomendações (ML)
- RF05.1: Sistema deve recomendar produtos baseado no histórico do usuário
- RF05.2: Sistema deve sugerir produtos similares
- RF05.3: Sistema deve exibir produtos populares quando não há histórico
- RF05.4: Sistema deve aprender com interações do usuário (visualizações, compras)

#### RF06 - ChatBot Inteligente
- RF06.1: Sistema deve permitir interação via chat
- RF06.2: ChatBot deve responder sobre produtos disponíveis
- RF06.3: ChatBot deve informar sobre pedidos do usuário
- RF06.4: ChatBot deve fornecer informações sobre categorias
- RF06.5: ChatBot deve funcionar mesmo sem API key (modo fallback)

### Requisitos Não Funcionais

#### RNF01 - Performance
- Sistema deve responder requisições em menos de 2 segundos
- Interface deve carregar em menos de 3 segundos
- Sistema deve suportar pelo menos 100 usuários simultâneos

#### RNF02 - Segurança
- Senhas devem ser criptografadas (bcrypt)
- Autenticação via JWT
- Validação de dados de entrada
- Proteção contra SQL Injection
- Proteção de rotas sensíveis

#### RNF03 - Usabilidade
- Interface responsiva (mobile-first)
- Navegação intuitiva
- Feedback visual para ações do usuário
- Mensagens de erro claras e objetivas

#### RNF04 - Confiabilidade
- Sistema deve ter disponibilidade de 99%
- Tratamento de erros robusto
- Fallback para funcionalidades críticas
- Logs de erros para debugging

#### RNF05 - Manutenibilidade
- Código seguindo princípios SOLID
- Documentação completa da API
- Estrutura modular e organizada
- TypeScript para type safety

#### RNF06 - Escalabilidade
- Arquitetura preparada para crescimento
- Banco de dados normalizado
- Separação de responsabilidades (front-end/back-end)

## 🎨 Interface e Design Web

### Prototipagem

O design foi planejado seguindo princípios de UX/UI modernos, com foco em:
- **Simplicidade**: Interface limpa e intuitiva
- **Responsividade**: Funciona perfeitamente em desktop, tablet e mobile
- **Acessibilidade**: Cores contrastantes e navegação clara
- **Performance**: Carregamento rápido e interações fluidas

**Ferramentas de Prototipagem Recomendadas:**
- Figma (para wireframes e mockups)
- Adobe XD (para protótipos interativos)
- Canva (para elementos visuais e branding)

### Design Responsivo

A aplicação foi desenvolvida com **mobile-first approach**, garantindo:

#### Breakpoints
- **Mobile**: < 768px (layout em coluna única)
- **Tablet**: 768px - 1024px (layout adaptativo)
- **Desktop**: > 1024px (layout completo)

#### Componentes Responsivos
- Grid de produtos adapta-se automaticamente
- Menu de navegação colapsa em mobile
- Formulários otimizados para touch
- Imagens com lazy loading

### Área do Usuário Final

#### Páginas Implementadas

1. **Home (Página Inicial)**
   - Banner de boas-vindas
   - Seção de produtos recomendados (ML)
   - Produtos em destaque
   - Design moderno com gradientes

2. **Listagem de Produtos**
   - Grid responsivo de produtos
   - Filtros laterais (categoria, preço)
   - Busca por texto
   - Ordenação (preço, nome, data)
   - Paginação visual

3. **Detalhes do Produto**
   - Imagem grande do produto
   - Informações completas
   - Botão de adicionar ao carrinho
   - Produtos similares (ML)
   - Design focado na conversão

4. **Carrinho de Compras**
   - Lista de itens
   - Controles de quantidade
   - Resumo do pedido
   - Botão de finalizar compra
   - Design limpo e funcional

5. **Meus Pedidos**
   - Histórico de pedidos
   - Status de cada pedido
   - Detalhes dos itens
   - Design organizado

6. **Autenticação**
   - Páginas de login e registro
   - Validação em tempo real
   - Mensagens de erro claras
   - Design minimalista

#### Características Visuais
- **Cores Principais:**
  - Azul: #007bff (ações principais)
  - Verde: #27ae60 (preços, sucesso)
  - Cinza: #2c3e50 (textos)
  - Gradiente roxo: #667eea → #764ba2 (destaques)

- **Tipografia:**
  - Fontes do sistema para performance
  - Hierarquia clara de tamanhos
  - Boa legibilidade

- **Componentes:**
  - Cards com sombras suaves
  - Botões com hover effects
  - Animações sutis
  - Loading states

### Área Administrativa

#### Funcionalidades Administrativas Implementadas

1. **Dashboard Administrativo** (`/admin`)
   - Visão geral com estatísticas (produtos, pedidos, usuários, receita)
   - Acesso rápido às principais funcionalidades
   - Design moderno e intuitivo

2. **Gestão de Produtos** (`/admin/products`)
   - ✅ Criar novos produtos com formulário completo
   - ✅ Editar produtos existentes
   - ✅ Deletar produtos
   - ✅ Upload de imagens (via URL)
   - ✅ Controle de estoque
   - ✅ Gerenciamento de categorias
   - ✅ Tabela responsiva com todas as informações

3. **Gestão de Pedidos** (`/admin/orders`)
   - ✅ Visualizar todos os pedidos do sistema
   - ✅ Atualizar status dos pedidos (pendente, processando, enviado, entregue, cancelado)
   - ✅ Visualizar detalhes completos de cada pedido
   - ✅ Informações do usuário e itens do pedido

4. **Gestão de Usuários** (`/admin/users`)
   - ✅ Listar todos os usuários cadastrados
   - ✅ Editar informações do usuário
   - ✅ Alterar role (cliente/admin)
   - ✅ Deletar usuários (exceto admins)
   - ✅ Visualizar data de cadastro

#### Interface Administrativa

- **Navegação**: Menu de navegação dedicado entre as páginas admin
- **Proteção de Rotas**: Componente `ProtectedRoute` garante acesso apenas para admins
- **Design Responsivo**: Interface adaptada para desktop e mobile
- **Feedback Visual**: Modais para criação/edição, confirmações para ações destrutivas
- **Integração Completa**: Todas as funcionalidades integradas com a API RESTful

### Implementação HTML5 e CSS3

#### HTML5 Semântico
- Uso de tags semânticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`)
- Estrutura acessível
- Meta tags para SEO
- Suporte a screen readers

#### CSS3 Moderno
- **Flexbox e Grid**: Layouts responsivos
- **Custom Properties**: Variáveis CSS para temas
- **Transitions e Animations**: Interações suaves
- **Media Queries**: Responsividade
- **Pseudo-classes**: Estados hover, focus, active

#### Estrutura de Estilos
```
frontend/src/
├── App.css          # Estilos globais
├── components/
│   ├── Navbar.css   # Navegação
│   ├── ProductCard.css
│   └── Chatbot.css
└── pages/
    ├── Home.css
    ├── Products.css
    └── ...
```

### Acessibilidade

- Contraste adequado de cores (WCAG AA)
- Navegação por teclado
- Labels descritivos
- Alt text em imagens
- Estrutura semântica HTML

## 📋 Características

- ✅ **Front-End**: React.js com TypeScript, consumo de APIs, filtros e ordenação
- ✅ **Back-End**: TypeScript + Node.js (Express) seguindo princípios SOLID
- ✅ **Banco de Dados**: PostgreSQL com integração completa
- ✅ **Machine Learning**: Sistema de recomendações baseado em histórico do usuário
- ✅ **ChatBot**: Integração com OpenAI API (ChatGPT)
- ✅ **Documentação**: Swagger para documentação completa da API

## 🚀 Tecnologias

### Back-End
- Node.js + Express
- TypeScript
- PostgreSQL
- OpenAI API
- Swagger/OpenAPI
- JWT para autenticação

### Front-End
- React.js
- TypeScript
- React Router
- React Query
- Axios
- Vite

## 📦 Instalação

### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL (v12 ou superior)
- Conta OpenAI com API Key

### 1. Clone o repositório
```bash
git clone <repository-url>
cd Ecommerce
```

### 2. Configure o Back-End

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=sua_senha

JWT_SECRET=seu_secret_key_aqui
JWT_EXPIRES_IN=7d

OPENAI_API_KEY=sua_openai_api_key_aqui
```

### 3. Configure o Banco de Dados

```bash
# Crie o banco de dados
createdb ecommerce_db

# As tabelas serão criadas automaticamente na primeira execução
# Para popular com dados de exemplo, execute:
npm run seed
```

**Usuários de teste criados pelo seed:**
- Admin: `admin@ecommerce.com` / `admin123`
- Cliente: `joao@test.com` / `123456`

### 4. Configure o Front-End

```bash
cd frontend
npm install
```

### 5. Execute a aplicação

**Terminal 1 - Back-End:**
```bash
npm run dev
```

**Terminal 2 - Front-End:**
```bash
cd frontend
npm run dev
```

A aplicação estará disponível em:
- Front-End: http://localhost:3001
- Back-End: http://localhost:3000
- API Docs: http://localhost:3000/api-docs

## 📚 Estrutura do Projeto

```
Ecommerce/
├── src/                    # Código do back-end
│   ├── controllers/        # Controllers (camada de apresentação)
│   ├── services/           # Services (lógica de negócio)
│   ├── repositories/      # Repositories (acesso a dados)
│   ├── models/             # Modelos de dados
│   ├── routes/             # Rotas da API
│   ├── middleware/         # Middlewares (auth, etc)
│   ├── database/           # Configuração do banco
│   └── server.ts           # Arquivo principal
├── frontend/               # Código do front-end
│   ├── src/
│   │   ├── api/            # Chamadas à API
│   │   ├── components/     # Componentes React
│   │   ├── contexts/       # Contexts (Auth, Cart)
│   │   ├── pages/          # Páginas da aplicação
│   │   └── types/          # Tipos TypeScript
│   └── package.json
└── README.md
```

## 🔑 Funcionalidades

### 1. Autenticação
- Registro de usuários
- Login com JWT
- Proteção de rotas
- Diferenciação de roles (cliente/admin)

### 2. Produtos
- CRUD completo de produtos
- Filtros por categoria, preço, busca
- Ordenação (preço, nome, data)
- Visualização de detalhes
- Imagens com fallback automático

### 3. Carrinho de Compras
- Adicionar/remover produtos
- Atualizar quantidades
- Persistência no localStorage
- Cálculo automático de totais

### 4. Pedidos
- Criar pedidos
- Visualizar histórico pessoal
- Atualizar status (admin)
- Validação de estoque

### 5. Machine Learning - Recomendações
- **Recomendações personalizadas**: Baseadas no histórico de interações do usuário
- **Produtos similares**: Baseados em categoria e preço
- **Produtos populares**: Baseados em interações gerais

### 6. ChatBot
- Integração com OpenAI API
- Contexto sobre produtos e pedidos do usuário
- Respostas inteligentes sobre a loja
- Modo fallback quando API não disponível

### 7. Área Administrativa
- **Dashboard**: Estatísticas e visão geral
- **Gestão de Produtos**: CRUD completo via interface
- **Gestão de Pedidos**: Visualização e atualização de status
- **Gestão de Usuários**: Listagem, edição e exclusão
- **Proteção de Rotas**: Acesso restrito a administradores

## 📖 API Endpoints

### Autenticação
- `POST /api/users` - Criar usuário
- `POST /api/users/login` - Login

### Produtos
- `GET /api/products` - Listar produtos (com filtros)
- `GET /api/products/:id` - Detalhes do produto
- `POST /api/products` - Criar produto (admin)
- `PUT /api/products/:id` - Atualizar produto (admin)
- `DELETE /api/products/:id` - Deletar produto (admin)

### Pedidos
- `POST /api/orders` - Criar pedido
- `GET /api/orders` - Listar todos os pedidos (admin)
- `GET /api/orders/:id` - Detalhes do pedido
- `GET /api/orders/user/:userId` - Pedidos do usuário
- `PUT /api/orders/:id/status` - Atualizar status

### Usuários (Admin)
- `GET /api/users` - Listar todos os usuários (admin)
- `GET /api/users/:id` - Detalhes do usuário
- `PUT /api/users/:id` - Atualizar usuário (admin)
- `DELETE /api/users/:id` - Deletar usuário (admin)

### Recomendações
- `GET /api/recommendations/user/:userId` - Recomendações para usuário
- `GET /api/recommendations/similar/:productId` - Produtos similares

### ChatBot
- `POST /api/chatbot/message` - Enviar mensagem ao chatbot

## 🎯 Princípios SOLID Aplicados

- **Single Responsibility**: Cada classe tem uma única responsabilidade
- **Open/Closed**: Interfaces permitem extensão sem modificação
- **Liskov Substitution**: Repositories implementam interfaces
- **Interface Segregation**: Interfaces específicas por domínio
- **Dependency Inversion**: Dependências injetadas via construtores

## 🤖 Machine Learning

O sistema de recomendações utiliza:
- **Collaborative Filtering**: Baseado em interações do usuário
- **Content-Based**: Baseado em similaridade de produtos
- **Popularity-Based**: Produtos mais populares como fallback

## 💬 ChatBot

O ChatBot utiliza a OpenAI API (GPT-3.5-turbo) e possui contexto sobre:
- Produtos disponíveis na loja
- Histórico de pedidos do usuário
- Categorias e informações gerais

## 📝 Documentação

A documentação completa da API está disponível em:
- Swagger UI: http://localhost:3000/api-docs

## 🔒 Segurança

- Senhas hashadas com bcrypt
- JWT para autenticação
- Validação de dados com express-validator
- Proteção de rotas com middleware

## 🧪 Testes

Para testar a aplicação:

1. Crie um usuário através do registro
2. Faça login
3. Navegue pelos produtos
4. Adicione produtos ao carrinho
5. Finalize um pedido
6. Veja recomendações personalizadas
7. Interaja com o ChatBot

## 📄 Licença

Este projeto foi desenvolvido como projeto acadêmico.

## 👨‍💻 Desenvolvido com

- TypeScript
- React.js
- Node.js
- Express
- PostgreSQL
- OpenAI API

---

**Nota**: Certifique-se de ter configurado corretamente as variáveis de ambiente, especialmente a `OPENAI_API_KEY` para o ChatBot funcionar.

### Testar ChatBot (IA vs Fallback)

Para verificar se o ChatBot está usando a OpenAI API (IA real) ou o modo fallback:

1. **Teste Rápido via Script:**
   ```bash
   npm run test:chatbot
   ```

2. **Verificar Logs do Servidor:**
   - Ao enviar mensagem, verifique o console do servidor
   - **IA ativa**: `🤖 [CHATBOT] Usando OpenAI API (GPT-3.5-turbo)...`
   - **Fallback**: `🤖 [CHATBOT] Modo FALLBACK ativado`

3. **Teste com Pergunta Complexa:**
   - Pergunta: "Me recomende um presente para minha mãe"
   - **IA**: Resposta criativa e personalizada
   - **Fallback**: Resposta genérica padrão

📖 **Guia Completo**: Veja `GUIA_TESTE_CHATBOT.md` para mais detalhes.

