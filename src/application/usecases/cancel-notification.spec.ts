import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { IMNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { CancelNotification } from "./cancel-notification";

describe("Cancel Notification", () => {
  it("should be able to cancel a notification", async () => {
    const repository = new IMNotificationsRepository();
    const notification = new Notification({
      category: "social",
      content: new Content("you are beathful"),
      recipientId: "any_recipient_id",
    });

    await repository.create(notification);

    const sut = new CancelNotification(repository);
    await sut.execute({
      notificationId: notification.id,
    });

    expect(repository.notifications[0].canceledAt).toBeTruthy();
  });

  it("should not be able to cancel notification when it does not exist", async () => {
    const repository = new IMNotificationsRepository();

    const sut = new CancelNotification(repository);

    await expect(
      sut.execute({
        notificationId: "any_id",
      }),
    ).rejects.toThrow("Notification not found");
  });
});
