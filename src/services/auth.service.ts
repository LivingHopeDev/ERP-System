import { IUserLogin, IUserSignUp } from "../types";
import config from "../config";
import { User } from "@prisma/client";
import { prismaClient } from "..";
import { hashPassword, comparePassword, generateAccessToken } from "../utils";
import { Conflict, ResourceNotFound, Unauthorised } from "../middlewares";
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

  public async login(payload: IUserLogin) {
    const { email, password } = payload;
    const userExist = await prismaClient.user.findFirst({ where: { email } });

    if (!userExist) {
      throw new ResourceNotFound("Authentication failed");
    }
    const isPassword = await comparePassword(password, userExist.password);
    if (!isPassword) {
      throw new ResourceNotFound("Authentication failed");
    }

    const accessToken = await generateAccessToken(userExist.id);
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() + parseInt(config.TOKEN_EXPIRY.replace("d", ""), 10)
    );
    await prismaClient.session.upsert({
      where: { userId: userExist.id },
      update: { sessionToken: accessToken, expiresAt },
      create: { userId: userExist.id, sessionToken: accessToken, expiresAt },
    });

    const user = {
      email: userExist.email,
      role: userExist.role,
    };
    return {
      message: "Login Successfully",
      user,
      token: accessToken,
    };
  }

  public async sendCrendentials(employeeId: string) {}
  public async forgotPassword(employeeId: string, payload) {}
  public async deleteEmployee(employeeId: string) {}
}
