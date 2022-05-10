import {
  UsersSemantixToDbUseCase,
  IUsersSemantixToDbUseCase,
} from "@/domain/user/usecases/users-semantix-to-db";
import { makeSemantixHttp } from "@/main/factories/infra/api";
import { makeDbUserRepository } from "@/main/factories/infra/database/mongodb";

export const makeUsersSemantixToDbUseCase = (): IUsersSemantixToDbUseCase => {
  const dbUserRepository = makeDbUserRepository();
  const semantixHttp = makeSemantixHttp();
  return new UsersSemantixToDbUseCase(dbUserRepository, semantixHttp);
};
