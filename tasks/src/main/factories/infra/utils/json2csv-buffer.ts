import { IJson2CsvBuffer } from "@/domain/@shared/utils";
import { Json2CsvBuffer } from "@/infra/utils/json2csv-buffer";

export const makeJson2CsvBuffer = (): IJson2CsvBuffer => {
  return new Json2CsvBuffer();
};
