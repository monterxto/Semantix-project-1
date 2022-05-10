import { ISemantixHttp } from "@/domain/user/https/semantix/semantix-http.interface";
import { user, address, contact } from "@/domain/user/https/semantix/types";
import { IUserRepository } from "@/domain/user/repository";
import { IUsersSemantixToDbDto } from "./dto";
import { IUsersSemantixToDbUseCase } from "./users-semantix-to-db.usecase.interface";

export class UsersSemantixToDbUseCase implements IUsersSemantixToDbUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private semantixHttp: ISemantixHttp
  ) {}

  async execute(): Promise<void> {
    let page = 1;
    while (true) {
      const users = await this.retryPromise<user[]>(
        this.semantixHttp.users(page),
        3
      );
      if (!users) {
        break;
      }
      for (const user of users) {
        const addresses = await this.retryPromise<address[]>(
          this.semantixHttp.address(user.id[0]),
          3
        );
        const contacts = await this.retryPromise<contact[]>(
          this.semantixHttp.contacts(user.id[0]),
          3
        );
        const userToDb: IUsersSemantixToDbDto = {
          idExternal: Number(user.id[0]),
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email[0],
          address: addresses && addresses[0]?.street[0],
          addressNumber: addresses && Number(addresses[0]?.number[0]._),
          phoneNumber: contacts && contacts[0]?.phoneNumber[0],
        };
        await this.usersRepository.updateByIdExternalOrCreate(
          userToDb.idExternal,
          userToDb
        );
      }
      page++;
    }
  }

  private async retryPromise<T>(
    promise: Promise<T>,
    retry: number
  ): Promise<T> {
    try {
      return await promise;
    } catch (e) {
      if (retry === 0) {
        return undefined;
      }
      return await this.retryPromise(promise, retry - 1);
    }
  }
}
