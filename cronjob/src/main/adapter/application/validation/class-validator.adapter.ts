import { Validation } from "@/application/protocols";
import { validate } from "class-validator";
import { MultipleErrors } from "@/application/errors";

export class adaptClassValidator implements Validation {
  constructor(private readonly classValidator: any) {}

  async validate(req: any): Promise<Error> {
    Object.keys(req).forEach((key) => {
      this.classValidator[key] = req[key];
    });

    return await validate(this.classValidator).then((errors) => {
      if (errors.length) {
        const errorsObj: { [type: string]: string }[] = errors.map(
          (error) => error.constraints
        );
        const messages = errorsObj.map((error) => Object.values(error)[0]);
        return Promise.reject(new MultipleErrors(messages));
      }
    });
  }
}
