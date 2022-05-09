export interface IRepository<T, DTO> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(dto: DTO): Promise<void>;
  update(id: string, dto: DTO): Promise<void>;
  delete(id: string): Promise<void>;
}
