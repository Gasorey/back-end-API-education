![logo-quero-edu-small](https://user-images.githubusercontent.com/1139813/90247813-c9cfc780-de0d-11ea-9a97-485a7212d9dd.png)

## Requisitos

Para utilizar rodar a API será necessário ter o docker instalado para mais informações

- https://docs.docker.com/get-docker/

## Criando os containers

Depois de instalar o docker, no terminal, rode os seguintes comandos.

```
docker run --name "quero_bolsa" -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=quero -e POSTGRES_DB=quero -p 5432:5432 -d postgres
```

```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

Para verificar se os contianers subiram:

```
docker ps
```

Para subir o container:

```
docker start quero_bolsa redis
```

## Instalando o projeto

Depois de clonar o projeto execute `yarn` para instalar as dependencias

Na pasta raiz do projeto crie um arquivo .env e ormconfig.json seguindo o exemplo dado nos arquivos:

ormconfig.example.json e .env.example

Execute `yarn typeorm migration:run` para subir as tabelas no banco de dados.

`yarn dev:server` para inicializar o projeto e `yarn test` para rodar os Testes

## Faker.JS

Para popular o banco de dados, foram gerados dados randomicos sendo assim é necessário exatidão para realizar os filtros.

Para os campos de nome foram gerados dados aleatórios.

Level do curso pode variar entre:

```
'Tecnólogo',
'Bacharelado',
'Licenciatura'
```

Shift do curso pode variar entre:

```
'Virtual',
'Manhã',
'Noite',
'Integral'
```

## Rotas

```
POST: localhost:3333/auth
Body:
    {
      "email":"anyemail@any.com.br"
    }
```

Response obtido pela rota auth:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTA2Nzg4OTQsImV4cCI6MTYxMDg1MTY5NCwic3ViIjoiSSBob3BlIHlvdSBndXlzIGxpa2UgdGhpcyBhcHBsaWNhdGlvbiB0aGF0IHdhcyBhIHBsZWFzdXJlIHRvIGNyZWF0ZSA6RCJ9.J69hk7JpJxUnFcQ6zEdIE3bcM6ztqIqYOW7Udp3P8wQ"
}
```

As outras rotas possuem um middleware de validação desse token. por favor passe ele no Authorization Bearer token

```
GET  localhost:3333/course
```

Esse endpoint pode ser filtrado por, shift, kind, level, university_name, passe os parametros desejados no campo de params

**_ Se atente as intruções passadas no topico Faker.JS _**

Exemplo response:

```
{
  "course": {
      "name": "Intranet",
      "kind": "EaD",
      "level": "Tecnólogo",
      "shift": "Integral",
      "university": {
          "name": "Melo, Moraes and Melo",
          "score": 1.16,
          "logo_url": "http://placeimg.com/640/480"
      },
      "campus": {
          "name": "Santa Catarina",
          "city": "Isabella Rodovia"
      }
  }
}
```

```
GET  localhost:3333/sales
```

Endpoint pode ser filtrado por: order( desc, asc), university_name, course_kind, course_level, course_shift, campus_city

Exemplo response:

```
{
  "full_price": 4666,
  "price_with_discount": 4479.36,
  "discount_percentage": 4,
  "start_date": "18/5/2021",
  "enrollment_semester": "2021.1",
  "enabled": false,
  "course": {
      "name": "Assurance",
      "kind": "Hibrido",
      "level": "Bacharelado",
      "shift": "Noite"
  },
  "university": {
      "name": "Moraes - Carvalho",
      "score": 6.4,
      "logo_url": "http://placeimg.com/640/480"
  },
  "campus": {
      "name": "Ceará",
      "city": "Carvalho Alameda"
  }
}
```

## Rate limiter

A aplicação possui um limite de 40 requisições por minuto, acima disso passa a retornar erro 429

Para alterar a quantidade de requisições aceitas

Em: `src/shared/infra/http/middleware/RateLimiter.ts`

em limiter altere os points (quantidade de requests) e duration (tempo até que se re inicie a contagem em segundos)

## Postman


[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/86b4cbf2a08b6a9eb02e)

