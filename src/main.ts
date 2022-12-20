import { KafkaConsumerService } from "@infra/messaging/kafka/kafka-consumer.service";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando validações do class-validation
  app.useGlobalPipes(new ValidationPipe());

  // Configurando o serviço do kafka
  const kafkaConsumerService = app.get(KafkaConsumerService);

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  });

  // Inicializar os microservices
  await app.startAllMicroservices();

  // Inicializando o servidor http na porta 3000
  await app.listen(3000);
}
bootstrap();
