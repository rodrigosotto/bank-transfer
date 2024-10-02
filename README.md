# Aplicação de Administração de Contas Bancárias

Esta é uma aplicação web para administração de contas bancárias, permitindo que os usuários criem contas, realizem transferências de fundos e consultem movimentações. A aplicação foi desenvolvida utilizando React, Redux, e uma API backend em Node.js.

## Tecnologias Utilizadas

- **Frontend**: React, Redux, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, MySQL
- **Bibliotecas**: React Toastify para notificações, Axios para requisições HTTP
- **Gestão de Estado**: Redux para gerenciamento global do estado da aplicação

## Funcionalidades

- Criação de contas bancárias
- Realização de transferências entre contas
- Consulta de movimentações realizadas
- Interface responsiva e estilizada com TailwindCSS

## Estrutura do Projeto

```plaintext
.
├── public
│   └── index.html
├── src
│   ├── api
│   │   └── api.ts              # Funções para comunicação com a API
│   ├── components
│   │   ├── FundTransfer.tsx     # Componente para transferências
│   │   ├── TransactionList.tsx   # Componente para listar movimentações
│   │   └── ...                  # Outros componentes
│   ├── store
│   │   ├── accountSlice.ts      # Slice do Redux para contas
│   │   └── store.ts             # Configuração do Redux
│   ├── types
│   │   └── types.ts             # Definições de tipos TypeScript
│   ├── App.tsx                  # Componente principal da aplicação
│   └── index.tsx                # Ponto de entrada da aplicação
├── package.json
└── README.md

## Tecnologias Utilizadas

- **Frontend**: React, Redux, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, MySQL
- **Bibliotecas**: React Toastify para notificações, Axios para requisições HTTP
- **Gestão de Estado**: Redux para gerenciamento global do estado da aplicação

## Funcionalidades

- Criação de contas bancárias
- Realização de transferências entre contas
- Consulta de movimentações realizadas
- Interface responsiva e estilizada com TailwindCSS

# Instalação

## Clone o Repositório

- git clone https://github.com/seu_usuario/nome_do_repositorio.git
- cd nome_do_repositorio

## Instale as dependências
- npm install

## Inicie a aplicação
- npm run dev

## Acesse a aplicação no Navegador
