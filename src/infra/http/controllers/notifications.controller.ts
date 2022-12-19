import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import {
  SendNotification,
  CancelNotification,
  ReadNotifications,
  UnreadNotifications,
  CountRecipientNotifications,
  GetRecipientNotifications,
} from "@application/usecases";
import { CreateNotificationBody } from "../dtos/create-notification-body";
import { NotificationViewModel } from "../view-model/notification-view-model";

@Controller("notifications")
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotifications,
    private unreadNotification: UnreadNotifications,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;
    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return NotificationViewModel.render(notification);
  }

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(":id/read")
  async read(@Param("id") id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(":id/unread")
  async unread(@Param("id") id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Get("count/from/:recipientId")
  async countFromRecipient(@Param("recipientId") recipientId: string) {
    const notificationsCount = await this.countRecipientNotifications.execute({ recipientId });

    return notificationsCount;
  }

  @Get("from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({ recipientId });

    return {
      notifications: notifications.map(NotificationViewModel.render),
    };
  }
}
