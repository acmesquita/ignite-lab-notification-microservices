import { Module } from "@nestjs/common";
import {
  SendNotification,
  CancelNotification,
  ReadNotifications,
  UnreadNotifications,
  CountRecipientNotifications,
  GetRecipientNotifications,
} from "@application/usecases";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotifications,
    UnreadNotifications,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HTTPModule {}
