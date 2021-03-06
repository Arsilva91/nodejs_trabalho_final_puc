# Trabalho Final - NodeJs - PUC 2021/22

- **Curso**: Arquitetura de Software Distribuído
- **Disciplina**: Arquitetura NodeJs
- **Turma**: 2021/22

## Alunos

- Ângelo Rafael da Silva
- Paulo Henrique Fernandes Duarte
- Franclis Galdino da Silva

## Tema

Desenvolvimento da arquitetura Backend de uma aplicação de gerenciamento de prestadores de serviço utilizando MongoDB para persistência de dados e json web tokens para autenticação e autorização dos acessos.

## Cronograma

1. [x] Definição do tema e escopo do trabalho.
1. [x] Desenho da arquitetura.
1. [x] Criar o banco usando mongodb contendo as collections users, suppliers e tags.
1. [x] Criar serviço de aplicativo "users" em NodeJs expondo o endpoint de login para usuários registrados.
1. [x] Criar serviço de aplicativo "tags" em NodeJs expondo endpoints de cadastro, pesquisa, atualização e exclusão para usuários logados.
1. [x] Criar serviço de aplicativo "suppliers" em NodeJs expondo endpoints de cadastro, pesquisa, atualização e exclusão para usuários logados.
1. [x] Adicionar middleware de segurança para autorizar acesso aos endpoints dos serviços "suppliers" e "tags" apenas para usuários logados.
1. [x] Adicionar middleware de segurança para autorizar acesso de alterações dos dados dos serviços "suppliers" e "tags" apenas para usuários administradores.
1. [x] Hospedar os serviços no heroku.
1. [x] Revisar e consolidar o estudo em modelo para o trabalho.
1. [x] Juntar artefatos a serem entregues e publicar no Canvas.
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

Na imagem seguinte temos uma visão geral de todos esses componentes e como eles se comunicam dentro da proposta arquitetural:

![arquitetura_node_js.png](/doc/aquitetura_node_js.drawio.png)

Por outra perspectiva, temos o diagrama seguinte apresentando as entidades que compõem nosso domínio e como elas se relacionam:

![domain model diagram](/doc/domain_model.png)

## Prova de Conceito

### Login um usuário

**POST** `https://final-nodejs-puc.herokuapp.com/sign_in`

Request Body:

``` json
{
	"email":"silva.rafael91k@gmail.com",
	"password":"abc123"
}
```

Response Body:

``` json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpbHZhLnJhZmFlbDkxa0BnbWFpbC5jb20iLCJuYW1lIjoiQW5nZWxvIFJhZmFlbCIsIl9pZCI6IjYyOGJlOTczOWYzZWJlZmYyMWUwNWExZSIsImlhdCI6MTY1MzM1NjAxMX0.zVzhZGJV3RUAKqWktOX1JT-WdGUp-HzM53_mY8wIeBI"
}
```

### Registre um usuário

**POST** `https://final-nodejs-puc.herokuapp.com/users`

Request Body:

``` json
{
	"name": "Angelo Rafael da Silva",
	"email": "silva.rafael91k@gmail.com",
	"password": "abc123",
	"roles":["admin"]
}
```
* por padrão as permissões são sempre de client

Response Body:

``` json
{
	"name": "Angelo Rafael da Silva",
	"email": "silva.rafael91k@gmail.com",
	 "roles": [
		"admin"
	    ],
	"_id": "628c37622926ff5c1c439dba",
	"__v": 0
}
```

### Caso queira ver todas as tags disponíveis

**GET** `https://final-nodejs-puc.herokuapp.com/tags`

``` json
[
	{
		"_id": "6289546bbb13b09e15ee6c2c",
		"tag": "Montador"
	},
	{
		"_id": "628959598a0e75583c384f2c",
		"tag": "Encanador"
	},
	{
		"_id": "628c3a6e2926ff5c1c439dc7",
		"tag": "Pintor"
	}
]
```

### Caso queira ver todas as tags disponíveis por id

**GET** `https://final-nodejs-puc.herokuapp.com/tags/6289546bbb13b09e15ee6c2c`

``` json
{
	"_id": "6289546bbb13b09e15ee6c2c",
	"tag": "Montador"
}
```

### Caso queira ver todas as tags disponíveis por uma descrição

**GET** `https://final-nodejs-puc.herokuapp.com/tags/search?tag=Montador`

``` json
{
	"_id": "6289546bbb13b09e15ee6c2c",
	"tag": "Montador"
}
```

### Caso queira cadastar tags

**POST** `https://final-nodejs-puc.herokuapp.com/tags`

``` json
{		
	"tag": "Pintor"
}
```

Response Body - 200:
``` json
{
	"tag": "Pintor",
	"_id": "628c3a6e2926ff5c1c439dc7"
}
```

### Caso queira alterar tags

**PUT** `https://final-nodejs-puc.herokuapp.com/tags/628c39af2926ff5c1c439dc2`

``` json
{		
	"tag": "Pintor"
}
```

Response Body - 200:
``` json
{
	"message": "Tag atualizado com sucesso"
}
```

### Caso queira excluir uma tags

**DELETE** `https://final-nodejs-puc.herokuapp.com/tags/628c39af2926ff5c1c439dc2`

Response Body - 200:
``` json
{
	"message": "Tag excluido com sucesso."
}
```

### Caso queira ver todos os prestadores disponíveis

**GET** `https://final-nodejs-puc.herokuapp.com/suppliers`

Response Body:
``` json
[
	 {
        "_id": "628959878a0e75583c384f2f",
        "name": "Angelo Rafael",
        "price": 50,
        "tags": [
            {
                "_id": "6289546bbb13b09e15ee6c2c",
                "tag": "Montador"
            },
            {
                "_id": "628959598a0e75583c384f2c",
                "tag": "Encanador"
            }
        ],
        "rate": 0,
        "latitude": 0,
        "longitude": 0,
        "range": 1,
        "image": "imagem",
        "description": "descrição"
    },
    {
        "_id": "628cc8f24f4dd32b6fc7a40f",
        "name": "Paulo Duarte",
        "price": 70,
        "tags": [
            {
                "_id": "6289546bbb13b09e15ee6c2c",
                "tag": "Montador"
            },
            {
                "_id": "628c3a6e2926ff5c1c439dc7",
                "tag": "Pintor"
            }
        ],
        "rate": 0,
        "latitude": 1,
        "longitude": 2,
        "range": 1,
        "image": "imagem",
        "description": "descrição"
    }
]
```

### Caso queira ver o prestador por id

**GET** `https://final-nodejs-puc.herokuapp.com/suppliers/628959878a0e75583c384f2f`

Response Body:
``` json
{
    "_id": "628959878a0e75583c384f2f",
    "name": "Angelo Rafael",
    "price": 50,
    "tags": [
        {
            "_id": "6289546bbb13b09e15ee6c2c",
            "tag": "Montador"
        },
        {
            "_id": "628959598a0e75583c384f2c",
            "tag": "Encanador"
        }
    ],
    "rate": 0,
    "latitude": 0,
    "longitude": 0,
    "range": 1,
    "image": "imagem",
    "description": "descrição"
}
```

### Pesquise por um prestador de serviço informando o id da tag

**GET** `https://final-nodejs-puc.herokuapp.com/suppliers/search?tags=6289546bbb13b09e15ee6c2c`

Response Body:
``` json
[
	 {
		"_id": "628959878a0e75583c384f2f",
		"name": "Angelo Rafael",
		"price": 50,
		"tags": [
		    {
			"_id": "6289546bbb13b09e15ee6c2c",
			"tag": "Montador"
		    },
		    {
			"_id": "628959598a0e75583c384f2c",
			"tag": "Encanador"
		    }
		],
		"rate": 0,
		"latitude": 0,
		"longitude": 0,
		"range": 1,
		"image": "imagem",
		"description": "descrição"
	    },
	    {
		"_id": "628cc8f24f4dd32b6fc7a40f",
		"name": "Paulo Duarte",
		"price": 70,
		"tags": [
		    {
			"_id": "6289546bbb13b09e15ee6c2c",
			"tag": "Montador"
		    },
		    {
			"_id": "628c3a6e2926ff5c1c439dc7",
			"tag": "Pintor"
		    }
		],
		"rate": 0,
		"latitude": 1,
		"longitude": 2,
		"range": 1,
		"image": "imagem",
		"description": "descrição"
	    }
]
```

### Caso queira ver todos os prestadores por localiozação

**GET** `https://final-nodejs-puc.herokuapp.com/suppliers/search/localization?latitude=1&longitude=2`

Response Body:
``` json
[
    {
        "_id": "628cc8f24f4dd32b6fc7a40f",
        "name": "Paulo Duarte",
        "price": 70,
        "tags": [
            {
                "_id": "6289546bbb13b09e15ee6c2c",
                "tag": "Montador"
            },
            {
                "_id": "628c3a6e2926ff5c1c439dc7",
                "tag": "Pintor"
            }
        ],
        "rate": 0,
        "latitude": 1,
        "longitude": 2,
        "range": 1,
        "image": "imagem",
        "description": "descrição"
    }
]
```

### Caso queira cadastar suppliers

**POST** `https://final-nodejs-puc.herokuapp.com/suppliers`

``` json
{      
    "name": "Paulo Duarte",
    "price": 60,
    "tags": ["6289546bbb13b09e15ee6c2c"],
    "rate": 0,
    "latitude": 1,
    "longitude": 2,
    "range": 1,
    "image": "imagem",
    "description": "descrição"
}
```

Response Body - 200:
``` json
{
    "name": "Paulo Duarte",
    "price": 60,
    "tags": [
        "6289546bbb13b09e15ee6c2c"
    ],
    "rate": 0,
    "latitude": 1,
    "longitude": 2,
    "range": 1,
    "image": "imagem",
    "description": "descrição",
    "_id": "628cc95d4f4dd32b6fc7a417"
}
```

### Caso queira alterar suppliers

**PUT** `https://final-nodejs-puc.herokuapp.com/suppliers/628c39af2926ff5c1c439dc2`

``` json
 {      
    "name": "Paulo Duarte",
    "price": 70,
    "tags": ["6289546bbb13b09e15ee6c2c", "628c3a6e2926ff5c1c439dc7"],
    "rate": 0,
    "latitude": 1,
    "longitude": 2,
    "range": 1,
    "image": "imagem",
    "description": "descrição"
}
```

Response Body - 200:
``` json
{
    "message": "Suppliers atualizado com sucesso"
}
```

### Caso queira excluir um suppliers

**DELETE** `https://final-nodejs-puc.herokuapp.com/suppliers/628cc95d4f4dd32b6fc7a417`

Response Body - 200:
``` json
{
    "message": "Suppliers excluido com sucesso."
}
```


### Tente cadastrar uma nova TAG estando logado com um usuário que não tem permissão ADMIN

**POST** `http://server.com/v1/tag`

Request Body:

``` json
{		
	"tag": "Pintor"
}
```

Response Body:

``` json
{
    "message": "Acesso nao permitido"
}
```

### Tente cadastrar um novo SUPPLIER estando logado com um usuário que não tem permissão ADMIN

Request Body:

``` json
{      
    "name": "Paulo Duarte",
    "price": 60,
    "tags": ["6289546bbb13b09e15ee6c2c"],
    "rate": 0,
    "latitude": 1,
    "longitude": 2,
    "range": 1,
    "image": "imagem",
    "description": "descrição"
}
```

Response Body:

``` json
{
    "message": "Acesso nao permitido"
}
```
