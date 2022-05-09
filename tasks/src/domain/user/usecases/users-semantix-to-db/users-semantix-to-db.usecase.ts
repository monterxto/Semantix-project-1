import { ISemantixHttp } from "@/domain/user/https/semantix/semantix-http.interface";
import { IUserRepository } from "../../repository";
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
      let retry = 0;
      try {
        const users = await this.semantixHttp.users(page);
        for (const user of users) {
          const addresses = await this.semantixHttp.address(user.id[0]);
          const contacts = await this.semantixHttp.contacts(user.id[0]);
          const userToDb: IUsersSemantixToDbDto = {
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email[0],
            address: addresses && addresses[0]?.street[0],
            addressNumber: addresses && Number(addresses[0]?.number[0]._),
            phoneNumber: contacts && contacts[0]?.phoneNumber[0],
          };
          await this.usersRepository.create(userToDb);
        }
        if (!users) {
          break;
        }
        page++;
      } catch (error) {
        await this.semantixHttp.sleep();
        if (retry === 3) {
          console.error(error);
          page++;
        }
        retry++;
      }
    }
  }
}
