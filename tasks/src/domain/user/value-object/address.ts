export class Address {
  private street: string;
  private number: number;

  constructor(street: string, number: number) {
    this.street = street;
    this.number = number;

    this.validate();
  }

  validate(): void {
    if (!this.street) {
      throw new Error("Street is required");
    }
    if (!this.number) {
      throw new Error("Number is required");
    }
  }

  toString(): string {
    return `${this.street}, ${this.number}`;
  }

  toJSON(): object {
    return {
      street: this.street,
      number: this.number,
    };
  }
}
