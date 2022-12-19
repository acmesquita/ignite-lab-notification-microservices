import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "@application/repositories/notification-repository";

export interface CountRecipientNotificationsProps {
  recipientId: string;
}

export interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}
  async execute(
    request: CountRecipientNotificationsProps,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
