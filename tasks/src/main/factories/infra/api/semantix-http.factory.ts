import { ISemantixHttp } from "@/domain/user/https/semantix/semantix-http.interface";
import { SemantixHttp } from "@/infra/api/semantix";
import { options } from "@/infra/configs/api/semantix";

export const makeSemantixHttp = (): ISemantixHttp => {
  return new SemantixHttp(options);
};
