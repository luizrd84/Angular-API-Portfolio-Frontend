# Portfolio para Projetos Pessoais

## Sobre o projeto

O **Portfolio para Projetos Pessoais** é a interface web responsável por exibir projetos, tecnologias e informações do desenvolvedor.

O projeto foi desenvolvido utilizando **Angular**, consumindo um backend **Node.js** e utilizando **MySQL** como banco de dados. Arquivos de mídia podem ser enviados e armazenados via **Cloudinary**.

Durante o desenvolvimento, foram explorados conceitos importantes do ecossistema **Angular** e **Node.js**, como:

- Criação de componentes Angular reutilizáveis
- Utilização de data binding e event binding
- Consumo de APIs REST com HttpClient
- Gerenciamento de estado de componentes
- Formulários com validação de dados
- Upload de arquivos para Cloudinary

O objetivo do projeto é criar um portfolio funcional que demonstre a integração entre frontend, backend e banco de dados, além de fornecer um exemplo de envio e armazenamento de arquivos.

## Tecnologias utilizadas

- **Node.js** – Backend da aplicação
- **Angular** – Frontend da aplicação
- **TypeScript** - Utilizando backend (Node.js) e no frontend (Angular)
- **MySQL** – Banco de dados relacional
- **Cloudinary** – Armazenamento e upload de arquivos
- **JWT** – Autenticação e segurança de endpoints

## Requisitos

- Node.js
- Angular CLI
- MySQL
- Conta Cloudinary (opcional, apenas se quiser utilizar uploads de arquivos)

## Configurando o banco de dados

- Acessar o banco de dados com a ferramenta que preferir e criar um banco chamado **portfolio_db**
- O banco pode ser criado com o comando SQL abaixo (por exemplo, no HeidiSQL ou MySQL Workbench):

```SQL
CREATE DATABASE portfolio_db;
```

## Instalação do projeto - Backend

Siga os passos abaixo para executar o projeto localmente.

1. Clonar o repositório

```bash
git clone https://github.com/luizrd84/Node.js-API-Portfolio-Backend.git
```

2. Acessar a pasta do projeto

```bash
cd Meu-Portfolio-BackEnd
```

3. Instalar dependências

```bash
npm install
```

4. Configurar as variáveis de ambiente

- Criar um arquivo chamado .env, usando como exemplo o arquivo .envExemplo.
- Informar senhas para o banco de dados.
- Escolher senha para o **JWT_SECRET**, usado para autenticação do administrador.
- Se quiser habilitar o upload de imagens, crie uma conta no **Cloudinary** e informe suas credenciais:
  - CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET

5. Rodar a aplicação

```bash
npm run dev
```

6. O backend ficará disponível em:

```
http://localhost:3000
```

## Instalação do projeto - Frontend

Siga os passos abaixo para executar o projeto localmente.

1. Clonar o repositório

```bash
git clone https://github.com/luizrd84/Angular-API-Portfolio-Frontend.git
```

2. Acessar a pasta do projeto

```bash
cd Meu-Portfolio-FrontEnd
```

3. Instalar dependências

```bash
npm install
```

4. Rodar a aplicação

```bash
ng serve --open
```

5. O frontend ficará disponível em:

```
http://localhost:4200
```

- Certifique-se de que o **backend esteja rodando** antes de iniciar o frontend.

## Cadastrando o usuário master

- Para acessar o sistema inicialmente, é necessário criar um usuário administrador (master).

```
database/seed.ts
```

1. Acesse o arquivo de seed e ajuste os dados conforme desejado:

2. Preparar o banco de dados

- Antes de executar o seed, é necessário que as tabelas já existam.
- As tabelas são criadas automaticamente na primeira execução do backend.

3. Executar o seed

- Com o banco já inicializado, rode o comando:

```bash
npx tsx database/seed.ts
```

## Demonstração do projeto

- A aplicação está disponível no endereço:

```
https://meu-portfolio-frontend.onrender.com/
```

- **Nota**: A aplicação está hospedada no Render utilizando o plano gratuito.
  Isso significa que o backend pode entrar em modo de hibernação após períodos sem uso, ocasionando um pequeno atraso (cold start) no primeiro acesso.

## Funcionalidades da aplicação

### Projetos

- Listagem de projetos cadastrados
- Cadastrar, alterar e excluir projetos
- Visualiazação individual de projetos com **carousel de imagens**

### Imagens

- Upload de imagens via **Cloudinary**
- Possibilidade de envio de imagens por **links externos**

### Tecnologias

- Listagem de tecnologias cadastradas
- Cadastrar e excluir tecnologias

### Usuários / Autenticação

- Login e autenticação via **JWT**
- Endpoints protegidos para operações de cadastro e edição

### Interface

- Componentes Angular reutilizáveis
- Formulários com validação de dados
- Exibição de dados em listas e tabelas

## Futuras melhorias

- Melhoria no tratamento de erros
- Melhorias de layout e responsividade
- Implementação de Refresh tokens para sessões mais seguras
- Melhora visual nas tarefas em andamento (Loadings e Envios de formulários)

## Autor

- Desenvolvido por Luiz Ricardo Dias.
