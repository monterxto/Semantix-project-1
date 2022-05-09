import { IRepository } from "@/domain/@shared/repository";
import { User } from "@/domain/user/entities";
import { IUsersSemantixToDbDto } from "@/domain/user/usecases/users-semantix-to-db/dto";

export interface IUserRepository
  extends IRepository<User, IUsersSemantixToDbDto> {}
