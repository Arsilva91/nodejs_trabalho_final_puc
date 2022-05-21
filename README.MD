# Teste

Sistema de gerenciamento de prestadores de serviço utilizando mongodb para persistência de dados e autenticação/autorização baseado em web tokens.

1. Criar o Banco em mongodb (Usuário, Prestador e habilidades)
1. Endpoint de cadastro, pesquisa, atualização
1. Criar endpoint de login
1. Autenticação/autorização
1. Hospedar em no heroku

## Usuários (user)

``` json
{
  "id": "a1a3a6be-6cad-41b6-aaea-de2e15fd5354",
   "name": "nome",
    "permission": [
      {
        "permission": "user"
      },
      {
        "permission": "admin"
      }
    ]
}
```

## Habilidades (tags)

``` json
{
   "id":"a1a3a6be-6cad-41b6-aaea-de2e15fd5354",
    "tag": "montador"
}
```

## Prestadores (suppliers)

``` json
{
    "supplierId": "a1a3a6be-6cad-41b6-aaea-de2e15fd5354",
    "name": "Prestador 3",
    "price": 95,
    "tags": [{"id":1, "descricao":"montador"}, {"id":2, "descricao": "mecanico"}]
    "rate": 4,
    "latitude": 2,
    "longitude": 9,
    "range": 3,
    "image": "https://thumbs.dreamstime.com/z/home-care-logo-design-template-vector-icon-128771044.jpg",
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the           1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap         into electronic typesetting, remaining essentially unchanged."
}
```
