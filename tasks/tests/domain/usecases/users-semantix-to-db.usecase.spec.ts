import { IUserRepository } from "@/domain/user/repository";
import { ISemantixHttp } from "@/domain/user/https/semantix/semantix-http.interface";
import { address, contact, user } from "@/domain/user/https/semantix/types";
import { UsersSemantixToDbUseCase } from "@/domain/user/usecases/users-semantix-to-db";
import { mock, MockProxy } from "jest-mock-extended";

describe("Users from semantix to db usecase unit test", () => {
  let mockUserRepository: MockProxy<IUserRepository>;
  let mockSemantixHttp: MockProxy<ISemantixHttp>;

  beforeEach(() => {
    mockUserRepository = mock<IUserRepository>();
    mockSemantixHttp = mock<ISemantixHttp>();
  });

  it("should create a report", async () => {
    const usersSemantixToDbUseCase = new UsersSemantixToDbUseCase(
      mockUserRepository,
      mockSemantixHttp
    );
    const mockUsersFromSemantix: user[] = [
      {
        id: ["1"],
        firstName: ["John"],
        lastName: ["Doe"],
        email: ["john@gmail.com"],
        createdAt: ["2020-01-01"],
        avatar: ["avatar.png"],
      },
      {
        id: ["2"],
        firstName: ["Doe"],
        lastName: ["John"],
        email: ["doe@gmail.com"],
        createdAt: ["2020-01-01"],
        avatar: ["avatar.png"],
      },
    ];
    const mockAddressFromSemantix: address[] = [
      {
        street: ["Rua tal"],
        number: [{ _: 123 }],
      },
    ];
    const mockContactFromSemantix: contact[] = [
      {
        phoneNumber: ["99999999"],
      },
    ];
    mockSemantixHttp.users.mockResolvedValueOnce(mockUsersFromSemantix);
    mockSemantixHttp.address.mockResolvedValue(mockAddressFromSemantix);
    mockSemantixHttp.contacts.mockResolvedValue(mockContactFromSemantix);

    await usersSemantixToDbUseCase.execute();
    expect(mockUserRepository.updateByIdExternalOrCreate).toHaveBeenCalledTimes(
      2
    );
  });
});
