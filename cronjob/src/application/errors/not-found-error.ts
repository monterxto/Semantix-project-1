export class NotFoundError extends Error {
  constructor(paramName: string) {
    super(`Not Found param: ${paramName}`);
    this.name = "NotFoundError";
  }
}
