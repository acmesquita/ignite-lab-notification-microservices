import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { NotificationNotFound } from "@application/errors/notification-not-found";

export interface UnreadNotificationsProps {
  notificationId: string;
}

export type UnreadNotificationsResponse = void;

@Injectable()
export class UnreadNotifications {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async execute(request: UnreadNotificationsProps): Promise<UnreadNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    if (!notification.readAt) {
      throw new Error("Invalid operation. You can't unread if not read after");
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
