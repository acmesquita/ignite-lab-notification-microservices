import { makeNotification } from "@test/factories/notification-factory";
import { IMNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { CountRecipientNotifications } from "./count-reciepient-notifications";

const makeNotifications = async () => {
  const repository = new IMNotificationsRepository();
  await repository.create(makeNotification({}));
  await repository.create(makeNotification({}));
  await repository.create(makeNotification({ recipientId: "recipient_2" }));

  const sut = new CountRecipientNotifications(repository);

  return sut;
};

describe("Count Recipient Notifications", () => {
  it("should be able to return the count recipient notifications", async () => {
    const sut = await makeNotifications();
    const result = await sut.execute({
      recipientId: "recipient_1",
    });

    expect(result.count).toBe(2);
  });

  it("should be able to return 0 when not have notifications", async () => {
    const repository = new IMNotificationsRepository();

    const sut = new CountRecipientNotifications(repository);
    const result = await sut.execute({
      recipientId: "any_recipient_id",
    });

    expect(result.count).toBe(0);
  });
});
