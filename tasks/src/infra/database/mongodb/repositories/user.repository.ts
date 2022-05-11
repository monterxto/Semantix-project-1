import { UserModel, UserDocument } from "../entities/user";
import { User } from "@/domain/user/entities";
import { IUserRepository } from "@/domain/user/repository";
import { IUsersSemantixToDbDto } from "@/domain/user/usecases/users-semantix-to-db/dto";
import { Address } from "@/domain/user/value-object";

export class UserRepository implements IUserRepository {
  async create(user: IUsersSemantixToDbDto): Promise<void> {
    try {
      await UserModel.create(user);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users: UserDocument[] = await UserModel.find();
      return users.map((user) => {
        let address;
        if (user.address && user.addressNumber) {
          address = new Address(user.address, user.addressNumber);
        }
        return new User(
          user._id,
          user.fullName,
          user.email,
          user.phoneNumber,
          address
        );
      });
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user: UserDocument = await UserModel.findById(id);
      let address;
      if (user.address && user.addressNumber) {
        address = new Address(user.address, user.addressNumber);
      }
      return new User(
        user._id,
        user.fullName,
        user.email,
        user.phoneNumber,
        address
      );
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async update(id: string, dto: Partial<IUsersSemantixToDbDto>): Promise<void> {
    try {
      await UserModel.findByIdAndUpdate(id, dto);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async updateByIdExternalOrCreate(
    idExternal: number,
    dto: Partial<IUsersSemantixToDbDto>
  ): Promise<void> {
    try {
      await UserModel.findOneAndUpdate({ idExternal }, dto, { upsert: true });
    } catch (error) {
      throw new Error(error as any);
    }
  }
}
