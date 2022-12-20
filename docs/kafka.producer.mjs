import { randomUUID } from "node:crypto";
import { Kafka } from "kafkajs";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "kafka-producer",
    brokers: ["localhost:9092"],
  });

  const producer = kafka.producer();

  await producer.connect();

  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
