import { Address } from "../value-object";

export class User {
  private fullName: string;
  private email: string;
  private address: Address;
  private phoneNumber: string;

  constructor(
    fullName: string,
    email: string,
    address: Address,
    phoneNumber: string
  ) {
    this.fullName = fullName;
    this.email = email;
    this.address = address;
    this.phoneNumber = phoneNumber;

    this.validate();
  }

  public validate(): void {
    if (!this.fullName) {
      throw new Error("Full name is required");
    }
    if (!this.email) {
      throw new Error("Email is required");
    }
    if (!this.address) {
      throw new Error("Address is required");
    }
    if (!this.phoneNumber) {
      throw new Error("Phone number is required");
    }
  }

  public toJSON(): object {
    return {
      fullName: this.fullName,
      email: this.email,
      address: this.address.toJSON(),
      phoneNumber: this.phoneNumber,
    };
  }
}
