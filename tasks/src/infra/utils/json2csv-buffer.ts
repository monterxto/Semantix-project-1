import { IJson2CsvBuffer } from "@/domain/@shared/utils/json2csv-buffer.interface";
import { writeToBuffer } from "@fast-csv/format";

export class Json2CsvBuffer implements IJson2CsvBuffer {
  async toBuffer<T>(json: T[]): Promise<Buffer> {
    const csv = await writeToBuffer(json, {
      headers: true,
    });
    return csv;
  }
}
