import { model, Schema } from "mongoose";
import { User } from "@/domain/user/entities";

export type UserDocument = {
  _id: string;
  idExternal: string;
  fullName: string;
  email: string;
  address: string;
  addressNumber: number;
  phoneNumber: string;
};

const UserSchema = new Schema(
  {
    idExternal: {
      type: Number,
      required: true
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    addressNumber: {
      type: Number,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const UserModel = model<User>("User", UserSchema);
