import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notification-repository";

export class IMNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
