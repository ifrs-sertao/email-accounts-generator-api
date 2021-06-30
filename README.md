<h1 align="center">EMAIL ACCOUNTS GENERATOR API</h1>
<p align="center">
  <img alt="Node.js Logo" src="https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js">&nbsp;&nbsp;
   <img alt="GitHub" src="https://img.shields.io/github/license/lemuelZara/concepts-nodejs.svg">
</p>

### Microsserviço para criação de sugestões de contas de e-mail para servidores e discentes de entidades públicas baseada no [Padrão de Formação de Endereços de Correio Eletrônico do Governo Federal Brasileiro](https://www.gov.br/governodigital/pt-br/governanca-de-dados/padrao-de-formacao-de-enderecos-de-correio-eletronico.pdf).

---
### Running locally

Clone the repository:

```sh
https://github.com/ifrs-sertao/email-accounts-generator-api
```

Rename env-example file to .env, and change data.

Build docker image:
```sh
docker build -t email-accounts-generator-api .
```

Start your container using the docker run:
```sh 
docker container run -d --name email-accounts-generator-api -p 6060:6060 email-accounts-generator-api
```
---

### Usage:
<br/>

 - POST </br>
  http://localhost:6060/api/v1/mails/generate
  </br>
  
    body (exemplo): 
    ```
    {
    "nome_completo": "Pedro Silva de Oliveira"
    }
    ```
