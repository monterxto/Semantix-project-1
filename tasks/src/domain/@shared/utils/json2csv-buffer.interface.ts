export interface IJson2CsvBuffer {
  toBuffer<T>(json: T[]): Promise<Buffer>;
}
