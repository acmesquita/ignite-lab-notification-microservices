## Ignite Lab Node 12/2022

Criação de um microserviço para gerenciamento de notificações utilizando as tecnologias:

- Nest JS
- Typescript
- Jest
- Class Validator
- Prisma IO
- Kafka

e boas práticas:

- Clean architecture
- Inversão de dependências
- Injeção de dependências
- Testes da camada de domínio da aplicação

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
yarn start:dev
```

Para validar o endpoint, utilizer o arquivo: `docs/notification.http`, nele está demonstrado todos os exemplo.
Sugestão, instale o [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) no VSCode e utilize o arquivo para validar.

Além disso, pode rodar todos os testes com o comando:

```
yarn test
```

### Utilizando mensageria

Nesse projeto adicionamos uma camada para receber o envio de notificações via kafka. Para isso, foi adicionado uma nova camada na aplicação que conecta ao um servidor kafka e observa um tópico.

Segue o passo a passo para utilizar a rota do kafka e vê a criação de mensagens.

1. Criação do servidor Kafka

```
docker compose up
```

2. Criação do tópico

Acesso o link: http://localhost:19000, clique em `+New` a fase de `Topics`. 

- **Topic name**: `notifications.send-notification`
- **Number of partitions**: 1
- **Replication factor**: 1

Clique em `Create` e pronto!

3. Criação de mensagens via _producer_

```
node docs/kafka.producer.mjs
```

> A versão do Node deve ser >=18.x.x

4. Suba a aplicação

```
yarn start:dev
```

5. Valide no prisma studio a criação das mensagens enviadas pelo comando 3

```
npx prisma studio
```

### Utilização do web view

Para que possamos visualizar as mensagens via web, foi criado o projeto `web-view`, onde podemos visualizar as notificações criadas no serviço.

Para visualizar basta:

```
cd web-view
yarn
yarn dev
```

Ao acessar http://localhost:5173 vai ser exibido no canto superior direito o sino de notificações, e ao clicar será listado todas as notificações do usuário.


That's all! :tada:
