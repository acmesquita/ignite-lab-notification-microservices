import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notification-repository";

export class IMNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async findById(notificationId: string): Promise<Notification | null> {
    return (
      this.notifications.find((item) => item.id === notificationId) ?? null
    );
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
