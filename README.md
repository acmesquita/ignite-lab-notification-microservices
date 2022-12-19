## Ignite Lab Node 12/2022

Criação de um microserviço para gerenciamento de notificações utilizando as tecnologias:

- Nest JS
- Typescript
- Jest
- Class Validator
- Prisma IO

e boas práticas:

- Clean architecture
- Inversão de dependências
- Injeção de dependências

### Incializar o projeto

Para iniciar o projeto é necessário instalar as dependências:

```
yarn install
```

Na sequência, precisamos preparar o banco de dados:

```
npx prisma migrate dev
```

Com esses dois passos concluídos, vamos levantar o servidor e testar a aplicação:

```
yarn start
```

Para validar o endpoint, utilizer o arquivo: `docs/notification.http`, nele está demonstrado todos os exemplo.
Sugestão, instale o [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VSCode e utilize o arquivo para validar.

Além disso, pode rodar todos os testes com o comando:

```
yarn test
```