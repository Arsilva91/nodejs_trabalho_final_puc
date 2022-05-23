# Trabalho Final - NodeJs - PUC 2021/22

Backend de uma aplicação de gerenciamento de prestadores de serviço utilizando MongoDB para persistência de dados e json web tokens para autenticação e autorização dos acessos.

## Alunos

- Ângelo Rafael da Silva
- Paulo Henrique Fernandes Duarte

## Cronograma

1. [x] Definição do tema e escopo do trabalho.
1. [x] Desenho da arquitetura.
1. [x] Criar o banco usando mongodb contendo as collections users, suppliers e tags.
1. [ ] Criar serviço de aplicativo "users" em NodeJs expondo o endpoint de login para usuários registrados.
1. [x] Criar serviço de aplicativo "tags" em NodeJs expondo endpoints de cadastro, pesquisa, atualização e exclusão para usuários logados.
1. [x] Criar serviço de aplicativo "suppliers" em NodeJs expondo endpoints de cadastro, pesquisa, atualização e exclusão para usuários logados.
1. [ ] Adicionar middleware de segurança para autorizar acesso aos endpoints dos serviços "suppliers" e "tags" apenas para usuários logados.
1. [ ] Adicionar middleware de segurança para autorizar acesso de alterações dos dados dos serviços "suppliers" e "tags" apenas para usuários administradores.
1. [ ] Hospedar os serviços no heroku.
1. [ ] Revisar e consolidar o estudo em modelo para o trabalho.
1. [ ] Juntar artefatos a serem entregues e publicar no Canvas.
1. [ ] Alterar visibilidade do projeto no github para `public`.

## Desenho da arquitetura

O projeto possui 3 serviços fundamentais:

- **Users**: Gerencia os usuários que podem acessar o sistema, converte senhas em hash e cria os web tokens.
- **Tags**: As Tags são termos reservados que servem para descrever os prestadores de serviço.
- **Suppliers**: Realiza os cadastros e contém todas as lógicas de regras de negócios para realizar as buscas de prestadores de serviços de acordo com as tags informadas pelo cliente.

Existem 3 atores principais:
- **User**: Qualquer usuário anônimo.
- **Client**: Um usuário autenticado e com capacidade de leitura dos dados de "tags" e "suppliers".
- **Admin**: Um usuário com as mesmas de um *Client* e também com permissões de cadastro, alteração e exclusão dos dados de "tags" e "suppliers".

![arquitetura_node_js.png](/doc/aquitetura_node_js.drawio.png)

## Implementação

Contar um pouco sobre o projeto, ex: os serviços estão hospedados no heroku e o banco de dados hospedado no atlas.

## Prova de Conceito

### Registre um usuário

**POST** `http://server.com/v1/users/register`

Request Body:

``` json
{
   "name": "pduarte",
   "password": "123",
   "permission": [ "client", "admin" ]
}
```
* por padrão as permissões são sempre de client

Response Body:

``` json
{
  "id": "022010d9-e6b1-4eab-8994-61fbaadbf7d7"
}
```

### Utilize o usuário cadastro para logar

**POST** `http://server.com.br/v1/users/login`

Request Body:

``` json
{
  "username": "pduarte",
  "password": "123" // será convertido em hash, ex: 401357cf18542b4117ca59800657b64cce2a36d8ad4c56b6102a1e0b03049e97
}
```

Response Body:

``` json
{
  "token": "401357cf18542b4117ca59800657b64cce2a36d8ad4c56b6102a1e0b03049e97",
  "expires": "2022-05-21T20:48:46.000Z"
}
```

### Caso queira ver todas as tags disponíveis

**GET** `http://server.com/v1/tags`

``` json
[
  {
    "id": "64b2b804-4a38-4bdb-a82f-2f71407820f7", 
    "tagName":"montador"
  }, 
  {
    "id": "c9872548-eb7e-423c-b3a2-e72dc8dd49a8", 
    "tagName": "mecanico"
  }
]
```

### Pesquise por um prestador de serviço informando qual o termo procurado

**GET** `http://server.com/v1/suppliers/search?tagName=:tags`

Response Body:

``` json
{
    "supplierId": "e5c48624-e5a3-4be8-bb32-3eb6387bfa30",
    "name": "Prestador 3",
    "price": 95,
    "tags": [
        {
          "id": "64b2b804-4a38-4bdb-a82f-2f71407820f7", 
          "tagName":"montador"
        }, 
        {
          "id": "c9872548-eb7e-423c-b3a2-e72dc8dd49a8", 
          "tagName": "mecanico"
        }
      ],
    "rate": 4,
    "latitude": 2,
    "longitude": 9,
    "range": 3,
    "image": "https://thumbs.dreamstime.com/z/home-care-logo-design-template-vector-icon-128771044.jpg",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the           1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap         into electronic typesetting, remaining essentially unchanged."
}
```

### Tente cadastrar uma nova TAG estando logado com um usuário que não tem permissão ADMIN

**POST** `http://server.com/v1/tag`

Request Body:

``` json
{
  "id": "64b2b804-4a38-4bdb-a82f-2f71407820f7", 
  "tagName": "teste"
}
```

Response Body:

``` json
{
  "success": false,
  "message": "usuário não tem permissão de cadastrar novas tags."
}
```

### Tente cadastrar um novo SUPPLIER estando logado com um usuário que não tem permissão ADMIN

Response Body:

``` json
{
  "success": false,
  "message": "usuário não tem permissão de cadastrar novos prestadores."
}
```

### Tente cadastrar uma nova TAG estando logado com um usuário que tem permissão ADMIN

Request Body:

``` json
{
  "id": "64b2b804-4a38-4bdb-a82f-2f71407820f7", 
  "tagName": "teste"
}
```

### Tente cadastrar um novo SUPPLIER estando logado com um usuário que tem permissão ADMIN
