import { IUserRepository } from "@/domain/user/repository";
import { IGoFileHttp } from "@/domain/user/https/gofile/gofile-http.interface";
import { IJson2CsvBuffer } from "@/domain/@shared/utils";
import { CreateReportsToGofileUseCase } from "@/domain/user/usecases/create-reports-to-gofile";
import { mock, MockProxy } from "jest-mock-extended";
import { User } from "@/domain/user/entities";
import { Address } from "@/domain/user/value-object";
import { folderList, server } from "@/domain/user/https/gofile/types";

describe("Create reports to gofile usecase unit test", () => {
  let mockUserRepository: MockProxy<IUserRepository>;
  let mockGoFileHttp: MockProxy<IGoFileHttp>;
  let mockJson2CsvBuffer: MockProxy<IJson2CsvBuffer>;

  beforeEach(() => {
    mockUserRepository = mock<IUserRepository>();
    mockGoFileHttp = mock<IGoFileHttp>();
    mockJson2CsvBuffer = mock<IJson2CsvBuffer>();
  });

  it("should create a report", async () => {
    const createReportsToGofileUseCase = new CreateReportsToGofileUseCase(
      mockUserRepository,
      mockGoFileHttp,
      mockJson2CsvBuffer
    );
    const mockFolderListFromGoFile: folderList = {
      data: {
        contents: {
          "1": {
            id: "1",
            name: "Users Report",
          },
        },
      },
    };
    const mockServerFromGoFile: server = {
      data: {
        server: "https://gofile.io",
      },
    };
    mockGoFileHttp.getContent.mockResolvedValue(mockFolderListFromGoFile);
    mockGoFileHttp.getServer.mockResolvedValue(mockServerFromGoFile);
    mockUserRepository.findAll.mockResolvedValue([
      new User(
        "1",
        "John Doe",
        "john@gmail.com",
        "99999999",
        new Address("Rua tal", 123)
      ),
      new User(
        "2",
        "Doe John",
        "doe@gmail.com",
        "88888888",
        new Address("Rua tal", 321)
      ),
    ]);
    await createReportsToGofileUseCase.execute();
    expect(mockGoFileHttp.getContent).toBeCalled();
    expect(mockGoFileHttp.getServer).toBeCalled();
    expect(mockUserRepository.findAll).toBeCalled();
    expect(mockJson2CsvBuffer.toBuffer).toBeCalled();
  });
});
