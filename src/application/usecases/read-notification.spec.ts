import { makeNotification } from "@test/factories/notification-factory";
import { IMNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { ReadNotifications } from "./read-notification";

describe("Read Notification", () => {
  it("should be able to cancel a notification", async () => {
    const repository = new IMNotificationsRepository();
    const notification = makeNotification({});

    await repository.create(notification);

    const sut = new ReadNotifications(repository);
    await sut.execute({
      notificationId: notification.id,
    });

    expect(repository.notifications[0].readAt).toBeTruthy();
  });

  it("should not be able to cancel notification when it does not exist", async () => {
    const repository = new IMNotificationsRepository();

    const sut = new ReadNotifications(repository);

    await expect(
      sut.execute({
        notificationId: "any_id",
      }),
    ).rejects.toThrow("Notification not found");
  });
});
