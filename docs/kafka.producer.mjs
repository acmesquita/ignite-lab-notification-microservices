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
          recipientId: "da1f365e-501d-4242-aec6-e50bbcab8d45",
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();
