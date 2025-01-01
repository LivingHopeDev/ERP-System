import { IUserLogin, IUserSignUp } from "../types";
import { User } from "@prisma/client";
import { prismaClient } from "..";
import { hashPassword } from "../utils";
import { Conflict } from "../middlewares";
export class AuthService {
  public async register(payload: IUserSignUp): Promise<{
    message: string;
    data: Partial<User>;
  }> {
    const { email, password } = payload;
    const hashedPassword = await hashPassword(password);
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      throw new Conflict("User already exists");
    }

    const newUser = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {
      data: newUser,
      message: "User Created Successfully.",
    };
  }

  public async login() {}
  public async sendCrendentials(employeeId: string) {}
  public async forgotPassword(employeeId: string, payload) {}
  public async deleteEmployee(employeeId: string) {}
}
