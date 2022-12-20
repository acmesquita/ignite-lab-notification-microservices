import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
  it("should be able to create a notification", () => {
    const notification = new Notification({
      content: new Content("New solicitation to friendship"),
      category: "social",
      recipientId: "recipientId",
    });

    expect(notification.content.value).toBeTruthy();
  });

  it("should be able to create a notification provider id and createdAt", () => {
    const notification = new Notification(
      {
        content: new Content("New solicitation to friendship"),
        category: "social",
        recipientId: "recipientId",
        createdAt: new Date(),
      },
      "any_id",
    );

    expect(notification.content.value).toBeTruthy();
    expect(notification.createdAt).toBeTruthy();
    expect(notification.category).toBeTruthy();
    expect(notification.recipientId).toBeTruthy();
  });
});
