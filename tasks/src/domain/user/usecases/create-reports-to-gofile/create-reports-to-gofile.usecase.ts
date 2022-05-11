import { IUserRepository } from "@/domain/user/repository";
import { IGoFileHttp } from "@/domain/user/https/gofile/gofile-http.interface";
import { ICreateReportsToGofileUseCase } from "./create-reports-to-gofile.usecase.interface";
import { IJson2CsvBuffer } from "@/domain/@shared/utils";
import { folder } from "@/domain/user/https/gofile/types";

export class CreateReportsToGofileUseCase
  implements ICreateReportsToGofileUseCase
{
  constructor(
    private usersRepository: IUserRepository,
    private goFileHttp: IGoFileHttp,
    private json2CsvBuffer: IJson2CsvBuffer
  ) {}

  async execute(): Promise<void> {
    const FOLDER_ROOT_ID = process.env.GOFILE_FOLDER_ROOT_ID;
    const folder_users_report_name = "Users Report";

    const users = await this.usersRepository.findAll();
    const usersToGofile = users.map((user) => ({
      id: user.getId(),
      fullName: user.getFullName(),
      email: user.getEmail(),
    }));

    const csvFile = await this.json2CsvBuffer.toBuffer(usersToGofile);
    const folderList = await this.goFileHttp.getContent(
      process.env.GOFILE_FOLDER_ROOT_ID
    );

    let folder: folder;
    const keysContents = Object.keys(folderList.data.contents);
    const folderExists = keysContents.find((key) => {
      if (folderList.data.contents[key].name === folder_users_report_name) {
        folder = { data: folderList.data.contents[key] };
        return true;
      }
      return false;
    });
    if (!folderExists) {
      folder = await this.goFileHttp.createFolder(
        FOLDER_ROOT_ID,
        folder_users_report_name
      );
    }

    const serverHost = await this.goFileHttp.getServer();
    await this.goFileHttp.uploadFile(
      folder.data.id,
      csvFile,
      serverHost.data.server,
      "users.csv"
    );
  }
}
