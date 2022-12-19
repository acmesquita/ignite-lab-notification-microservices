import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { NotificationNotFound } from "@application/errors/notification-not-found";

export interface CancelNotificationProps {
  notificationId: string;
}

export type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async execute(
    request: CancelNotificationProps,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
