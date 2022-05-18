import { User } from "@/domain/user/entities";
import { Address } from "@/domain/user/value-object";

describe("User entity unit test", () => {
  it("should create a user", () => {
    const address = new Address("Rua tal", 123);
    const user = new User(
      "1",
      "John Doe",
      "john@gmail.com",
      "99999999",
      address
    );
    expect(user).toBeTruthy();
  });

  it("should throw an error when create a user with invalid id", () => {
    const address = new Address("Rua tal", 123);
    expect(
      () =>
        new User(undefined, "John Doe", "john@gmail.com", "99999999", address)
    ).toThrow("User id is required");
  });

  it("should throw an error when create a user with invalid full name", () => {
    const address = new Address("Rua tal", 123);
    expect(
      () => new User("1", undefined, "john@gmail.com", "99999999", address)
    ).toThrow("Full name is required");
  });

  it("should throw an error when create a user with invalid email", () => {
    const address = new Address("Rua tal", 123);
    expect(
      () => new User("1", "John Doe", undefined, "99999999", address)
    ).toThrow("Email is required");
  });
});
