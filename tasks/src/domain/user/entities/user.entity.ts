import { Address } from "../value-object";

export class User {
  private id: string;
  private fullName: string;
  private email: string;
  private address: Address;
  private phoneNumber: string;

  constructor(
    id: string,
    fullName: string,
    email: string,
    phoneNumber?: string,
    address?: Address
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;

    this.validate();
  }

  public validate(): void {
    if (!this.id) {
      throw new Error("User id is required");
    }
    if (!this.fullName) {
      throw new Error("Full name is required");
    }
    if (!this.email) {
      throw new Error("Email is required");
    }
  }

  public toJSON(): object {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
      address: this.address.toJSON(),
      phoneNumber: this.phoneNumber,
    };
  }

  public getId(): string {
    return this.id;
  }

  public getFullName(): string {
    return this.fullName;
  }

  public getEmail(): string {
    return this.email;
  }
}
