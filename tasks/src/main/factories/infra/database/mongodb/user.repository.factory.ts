import { IUserRepository } from "@/domain/user/repository";
import { UserRepository } from "@/infra/database/mongodb/repositories/user.repository";

export const makeDbUserRepository = (): IUserRepository => {
  return new UserRepository();
};
