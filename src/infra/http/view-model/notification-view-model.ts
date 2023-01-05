import { Notification } from "@application/entities/notification";

export class NotificationViewModel {
  static render(notification: Notification) {
    return {
      notification: {
        id: notification.id,
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        createdAt: notification.createdAt,
      },
    };
  }
}
