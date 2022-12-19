import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { Notification } from "@application/entities/notification";

export interface GetRecipientNotificationsProps {
  recipientId: string;
}

export interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private readonly notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsProps,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request;

    const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
