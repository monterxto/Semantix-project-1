import {
  UsersSemantixToDbUseCase,
  IUsersSemantixToDbUseCase,
} from "@/domain/user/usecases/users-semantix-to-db";
import { makeSemantixHttp } from "../../infra/api";

export const makeUsersSemantixToDbUseCase = (): IUsersSemantixToDbUseCase => {
  // const dbSchedulerRepository = makeDbSchedulerRepository();
  const semantixHttp = makeSemantixHttp();
  return new UsersSemantixToDbUseCase(null, semantixHttp);
};
