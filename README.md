<p align="center">
  <img  src="https://github.com/patrickcordeiroestudos/social-dev/blob/main/src/img/Logo.svg" width="200px">
</p>

<h2 align="center" style="font-weight: bold;">Social Dev - Web Aplication </h2>

</br>
<p align="center">
  <img src="https://camo.githubusercontent.com/dda2124efff062e38068943c6e848540387df6e5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d253233303444333631" alt="licenceMIT">
</p>

## :speech_balloon: Sobre

Social Dev Institute, é uma aplicação para cadastro de Moradores de Rua e informações sobre campanhas socias. Aplicação desenvolvida em grupo durante o curso de **Desenvolvimento FullStack** oferecido pela [Kenzie Academy Brasil](https://kenzie.com.br/) aplicando todo o conhecimento adquirido durante a jornada. Neste projeto foi utilizada as
melhores práticas na construção do projeto, com o uso das tecnologias TypeScript, Express, TypeORM em cima do Ambiente e execução
de javascript, o NodeJS. 
A Kenzie é uma escola de programação com um ensino de qualidade que capacita seus aluno para se tornarem desenvolvedores FullStack em 12 meses!  

Faz parte do projeto Api Social Dev

- [Web Aplication](https://github.com/patrickcordeiroestudos/social-dev): Aplicação Web contruida em ReactJs e Typescript

## :rocket: Tecnologias

- [TypeScript](https://www.typescriptlang.org/): Linguagem.
- [NodeJs](https://nodejs.org/en/): Ambiente de Execução.
- [Express](https://expressjs.com/): API Framework
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken): Autenticação JWT
- [Postgres](https://www.postgresql.org/): Banco de Dados
- [TypeORM](https://typeorm.io/#/): ORM
- [Eslint](https://eslint.org/): Padronização de código
- [Jest](https://jestjs.io/): Testes

## 🔖 Layout

Uma API Rest, que retorna o conteúdo em JSON que vai ser consumida por um Front-end em [ReactJS](https://reactjs.org/).

### Base da Aplicação.

      - Framework da API - Express
      - Linguagem de Programação - TypeScript
      - Banco de dados utilizado na aplicação - Postgres
      - ORM - TypeORM
      - Lib de testes - Jest
      - Utilizar Eslint, Prettier e EditorConfig para padronizar o código em ambiente de desenvolvimento, com a style guide do AirBnb

### Criação de usuário Voluntário (CPF)

    [x] Criação de conta com (Nome, CPF, Email, Senha, Idade, Telefone);

    Regras de Negócio:
      [] Não pode ser criado duas contas com o mesmo email.
      [] Não pode ser criado duas contas com o mesmo CPF.

### Criação de usuário Instituição (CNPJ)

    [x] Criação de conta com (Nome, CNPJ, Email, Senha, Endereço, Telefone);

    Regras de Negócio:
      [] Não pode ser criado duas contas com o mesmo email.
      [] Não pode ser criado duas contas com o mesmo CNPJ.

### Autenticação

    
      [] O usuário deve poder se Autenticar utilizando email e senha;
      
      - A autenticação deve ser feita com Json Web Token (JWT);

    Regras de Negócio:
      [x] No payload do token deve ser armazenado o ID do usuário;
      

### Atualização de Perfil

    Requisitos Funcionais:
      [] O usuário deve poder atualizar seu perfil Voluntário (Nome, CPF, Email, Senha, Idade, Telefone);

    Regras de Negócio:
      [x] O usuário não pode alterar seu email para um email ja em uso na aplicação
      [x] Para atulizar sua senha, o usuário deve informar a senha antiga;
      [x] Para atulizar sua senha, o usuário precisa confirmar a senha;

### Painel de usuário (Prestador de serviço)

    Requisitos Funcionais:
      [] O prestador deve poder listar os seus agendamentos de um dia especifico;
      [] O prestador deve poder receber uma notificação sempre que houver um novo agendamento;
      [] O prestador deve poder visualizar as notificações não lidas;


    Requisitos Não Funcionais:
      - Os agendamentos devem ser armazenados em cache.
      - As notificações do prestador devem ser armazenadas no MongoDB;
      - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

    Regras de Negócio:
      [] A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

### Agendamento de serviço

    Requisitos Funcionais:
      [] O usuário deve poder listar todos os prestadores de serviço cadastrados;
      [] O usuário deve poder visualizar os dias de um mês com pelo menos um horário disponível de um prestador;
      [] O usuário deve poder visualizar os horários disponíveis de um dia especifico de um prestador;
      [] O usuário deve poder realizar um novo agendamento com um prestador;
      [] O usuário deve poder listar os agendamentos já marcados;
      [] O usuário deve poder cancelar um agendamento marcado.

    Requisitos Não Funcionais:
      - A listagem de prestadores devem ser armazenadas em cache.

    Regras de Negócio:
      [] Cada agendamento deve durar 1h exatamente;
      [] Os agendamentos devem estar disponíveis entre 8h às 18h sendo o último agendamento iniciado as 17h;
      [] O usuário não pode agendar em um horário já ocupado;
      [] O usuário não pode agendar em um horário que já passou;
      [] O usuário não pode agendar consigo mesmo;

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado o [Git](https://git-scm.com) em sua máquina. 
Além disto é bom ter um editor para trabalhar com o código como [VSCode][vscode]

### 🧭 Rodando a aplicação web localmente na sua máquina (Front End)

```bash
# Clone este repositório
$ git clone https://github.com/patrickcordeiroestudos/social-dev.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd social-dev

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000
```

## 😯 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)

## 📝 Licença

Este projeto esta sob a licença MIT.

## 🖋 Autores

Feito com ❤️ por Patrick Cordeiro 👋🏽 [Entre em contato!](https://www.linkedin.com/in/patrickcordeiro/)

Feito com ❤️ por Antônio Pedro 👋🏽 [Entre em contato!](https://www.linkedin.com/in/antoniopedrosn/)

Feito com ❤️ por Clayson Roberto 👋🏽 [Entre em contato!](https://www.linkedin.com/in/clayson-roberto-eufrasio/)

Feito com ❤️ por Emerson Gonçalves 👋🏽 [Entre em contato!](www.linkedin.com/in/emerson-goncalves-dos-santos)

Feito com ❤️ por Katya Keila 👋🏽 [Entre em contato!](https://www.linkedin.com/in/katya-oliveira/)

Feito com ❤️ por Neto Calegari 👋🏽 [Entre em contato!](https://www.linkedin.com/in/jose-antonio-calegari-neto/)

Projeto desenvolvido em grupo durante o curso de **Desenvolvimento FullStack** oferecido pela [Kenzie Academy Brasil](https://kenzie.com.br/). A Kenzie é uma escola de programação com um ensino de qualidade que capacita seus aluno para se tornarem desenvolvedores FullStack em 12 meses!
