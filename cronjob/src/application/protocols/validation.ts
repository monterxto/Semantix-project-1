export interface IValidation {
  validate: (input: any) => Error | Promise<Error>;
}
