import { Module } from "@nestjs/common";
import { SendNotification } from "@application/usecases";
import { NotificationsController } from "./kafka/controllers/notifications.controller";
import { KafkaConsumerService } from "./kafka/kafka-consumer.service";
import { DatabaseModule } from "@infra/database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
