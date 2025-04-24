# Desafio Técnico Pluga - Dev Jr.

Nós da Pluga nos orgulhamos do nosso time e queremos sempre boas pessoas que acrescentem, por isso gostamos de testar as pessoas que se candidatam.

Esse é um desafio que queremos que você supere:

Desenvolver uma tela com uma listagem de cards representando os apps integrados na Pluga e uma barra de busca (ref: wireframe1.png).

Use os dados retornados em pluga.co/ferramentas_search.json para construir essa listagem, a paginação pode ser de 12 em 12 apps;

Ao clicar nos cards, deve abrir um modal referente ao app selecionado (ref: wireframe2.png) com um link para acessar a página do app no site da Pluga, esse link vem junto das outras informações em JSON;

Esse modal deve conter uma seção "Últimas ferramentas visualizadas", que mostre as 3 últimas ferramentas visualizadas, independente de quantos cards de apps sejam acessados.

Iremos julgar pelos critérios: legibilidade do código, separação de responsabilidades e expressividade dos nomes. Pense como o usuário, atente-se para os estados vazios, o próprio site da Pluga pode te inspirar.

Requisitos técnicos:

O desafio deve ser feito utilizando React;

Escrever testes será um diferencial;

Mantenha as coisas simples, boa sorte! ;)

## Projeto Publicado

Você pode acessar o projeto publicado na Vercel pelo link abaixo:

- https://pluga-dev-challenge-jr-ts.vercel.app

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- TailwindCSS
- Shadcn/UI
- ESLint
- Vitest (para testes)

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/neogabe/pluga_dev_challenge_jr_ts.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

## Como Executar

1. Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

## Testes

Para executar os testes:

```bash
npm test
# ou
yarn test
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── assets/        # Recursos estáticos
│   ├── components/    # Componentes reutilizáveis
│   ├── hooks/         # Custom hooks
│   ├── lib/          # Configurações e utilitários
│   ├── services/     # Serviços e APIs
│   ├── types/        # Definições de tipos TypeScript
│   ├── App.tsx       # Componente principal
│   └── main.tsx      # Ponto de entrada
├── public/           # Arquivos estáticos
├── vite.config.ts    # Configuração do Vite
├── tsconfig.json     # Configuração do TypeScript
└── package.json      # Dependências e scripts
```

## Critérios de Avaliação

- Legibilidade do código
- Separação de responsabilidades
- Expressividade dos nomes
- Experiência do usuário
- Tratamento de estados vazios
- Qualidade dos testes
