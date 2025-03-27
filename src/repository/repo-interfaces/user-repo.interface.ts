import { User } from "../models/user.model";

export interface UserInterface {
  getAccessToken(query: {
    userId: string;
    password: string;
  }): Promise<{ token: string } | null>;
  create(
    user: Partial<User> & { password: string },
  ): Promise<{ userId: string }>;
  update(
    user: Partial<User> & { password: string },
  ): Promise<{ updated: boolean }>;
  delete(userId: number): Promise<boolean>;
  getDetailsById(userId: string): Promise<User | null>;
}