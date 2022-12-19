import { makeNotification } from "@test/factories/notification-factory";
import { IMNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

const makeNotifications = async () => {
  const repository = new IMNotificationsRepository();
  await repository.create(makeNotification({}));
  await repository.create(makeNotification({}));
  await repository.create(makeNotification({ recipientId: "recipient_2" }));

  const sut = new GetRecipientNotifications(repository);

  return sut;
};

describe("get Recipient Notifications", () => {
  it("should be able to return the get recipient notifications", async () => {
    const sut = await makeNotifications();
    const result = await sut.execute({
      recipientId: "recipient_1",
    });

    expect(result.notifications.length).toBe(2);
    expect(result.notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "recipient_1" }),
        expect.objectContaining({ recipientId: "recipient_1" }),
      ]),
    );
  });

  it("should be able to return 0 when not have notifications", async () => {
    const repository = new IMNotificationsRepository();

    const sut = new GetRecipientNotifications(repository);
    const result = await sut.execute({
      recipientId: "any_recipient_id",
    });

    expect(result.notifications.length).toBe(0);
  });
});
