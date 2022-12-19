import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { NotificationNotFound } from "@application/errors/notification-not-found";

export interface ReadNotificationsProps {
  notificationId: string;
}

export type ReadNotificationsResponse = void;

@Injectable()
export class ReadNotifications {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async execute(request: ReadNotificationsProps): Promise<ReadNotificationsResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
