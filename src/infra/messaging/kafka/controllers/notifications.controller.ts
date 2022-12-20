import { SendNotification } from "@application/usecases";
import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

interface SendNotificationPayload {
  content: string;
  category: string;
  recipientId: string;
}

@Controller()
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}
  @EventPattern("notifications.send-notification")
  async handleSandNotification(
    @Payload() { category, content, recipientId }: SendNotificationPayload,
  ) {
    await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });
  }
}
