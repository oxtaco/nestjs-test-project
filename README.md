<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Before Use

Rename .example.env into .env and define all the required variables

## Docker

```bash
# start
$ docker-compose up -d

# stop
$ docker-compose down
```

# In case any MYSQL conflict errors (table already exists, etc):

```bash
$ docker-compose down -v
```

Then manualy delete the <b>dist</b> directory and run:

```bash
$ docker-compose up -d --build
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Routes documentation

Go to http://localhost:8080/documentation/

## MYSQL Diagram

![relations](/images/relations.png?raw=true)

[Origin](https://dbdiagram.io/d/61671337940c4c4eec93f8b0)
