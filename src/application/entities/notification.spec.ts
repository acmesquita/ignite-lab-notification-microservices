import { Content } from "./content";
import { Notification } from "./notification";

describe("Notification", () => {
  it("should be able to create a notification", () => {
    const notification = new Notification({
      content: new Content("New solicitation to friendship"),
      category: "social",
      recipienteId: "recipienteId",
    });

    expect(notification.content.value).toBeTruthy();
  });
});
