import { Inject } from "@nestjs/common";
import { REPOENUM } from "src/common/constans";
import { User } from "src/repository/models/user.model";
import { UserInterface } from "src/repository/repo-interfaces/user-repo.interface";

export class UserService {
  constructor(@Inject(REPOENUM.USERREPO) private readonly userRepo: UserInterface) {}
  async createOne(data: { name: string; email: string; password: string }): Promise<{message: string, data: any}> {
    const newUser = await this.userRepo.create(data);
    return {
        message: "User created successfully",
        data: newUser
    }
  }
  async getUserDetails(userId: string): Promise<{message: string, data: any}> {
    const userData = await this.userRepo.getDetailsById(userId);
    if(userData){
        return {
            message: "User Found successfully",
            data: userData
        }
    }
    return {
        message: "User not found",
        data: null
    }
  }
  async getAccessToken(query: { userId: string; password: string; }) :Promise<{message: string, data: any}> {
    const token = await this.userRepo.getAccessToken(query);
    if(token){
        return {
            message: "Token generated successfully",
            data: token
        }
    }
    return {
        message: "Invalid credentials",
        data: null
    }
  }
}