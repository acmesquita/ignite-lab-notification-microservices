import { makeNotification } from "@test/factories/notification-factory";
import { IMNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { UnreadNotifications } from "./unread-notification";

describe("Unread Notification", () => {
  it("should be able to unread a notification", async () => {
    const repository = new IMNotificationsRepository();
    const notification = makeNotification({
      readAt: new Date(),
    });

    await repository.create(notification);

    const sut = new UnreadNotifications(repository);
    await sut.execute({
      notificationId: notification.id,
    });

    expect(repository.notifications[0].readAt).toBeNull();
  });

  it("should not be able to unread notification when it does not exist", async () => {
    const repository = new IMNotificationsRepository();
    const sut = new UnreadNotifications(repository);

    await expect(
      sut.execute({
        notificationId: "any_id",
      }),
    ).rejects.toThrow("Notification not found");
  });
});
