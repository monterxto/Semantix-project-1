import { IGoFileHttp } from "@/domain/user/https/gofile/gofile-http.interface";
import { GofileHttp } from "@/infra/api/gofile";
import { options } from "@/infra/configs/api/gofile";

export const makeGoFileHttp = (): IGoFileHttp => {
  return new GofileHttp(options);
};
