export class MultipleErrors extends Error {
  arrayErrors: string[];

  constructor(message: string | string[]) {
    super(typeof message == "string" ? message : message.join("\n"));
    this.name = "MultipleErrors";
    this.arrayErrors = typeof message == "string" ? [message] : message;
  }
}
