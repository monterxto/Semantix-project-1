import {
  CreateReportsToGofileUseCase,
  ICreateReportsToGofileUseCase,
} from "@/domain/user/usecases/create-reports-to-gofile";
import { makeDbUserRepository } from "@/main/factories/infra/database/mongodb";
import { makeJson2CsvBuffer } from "@/main/factories/infra/utils";
import { makeGoFileHttp } from "@/main/factories/infra/api";

export const makeCreateReportsToGofileUseCase =
  (): ICreateReportsToGofileUseCase => {
    const dbUserRepository = makeDbUserRepository();
    const goFileHttp = makeGoFileHttp();
    const json2CsvBuffer = makeJson2CsvBuffer();
    return new CreateReportsToGofileUseCase(
      dbUserRepository,
      goFileHttp,
      json2CsvBuffer
    );
  };
