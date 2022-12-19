import { IMNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { SendNotification } from "./send-notification";

describe("Send Notification", () => {
  it("should be able to send notification", async () => {
    const repository = new IMNotificationsRepository();
    const sut = new SendNotification(repository);

    const result = await sut.execute({
      category: "social",
      content: "you are beathful",
      recipientId: "any_recipient_id",
    });

    expect(result.notification).toBeTruthy();
    expect(repository.notifications).toHaveLength(1);
  });
});
