export interface IRepository<T, DTO> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(dto: DTO): Promise<T>;
  update(id: string, dto: Partial<DTO>): Promise<void>;
  delete(id: string): Promise<void>;
}
