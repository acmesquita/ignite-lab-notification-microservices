import { Content } from "./content";

describe("Notification Content", () => {
  it("should be able to create a notification content", () => {
    const text = "you recived a new friendship solicitation";
    const content = new Content(text);

    expect(content.value).toBe(text);
  });

  it("should not be able to create a notification content with less than 5 caracters", () => {
    const smallText = "you";

    expect(() => new Content(smallText)).toThrow("Content length invalid");
  });

  it("should not be able to create a notification content with great than 240 caracters", () => {
    const bigText = "a".repeat(241);

    expect(() => new Content(bigText)).toThrow("Content length invalid");
  });
});
