import { address, contact, user } from "./types";

export interface ISemantixHttp {
  users(page: number): Promise<user[]>;
  address(userId: string): Promise<address[]>;
  contacts(userId: string): Promise<contact[]>;
  sleep(): Promise<void>;
}