import { prismaClient } from "..";
import { ResourceNotFound } from "../middlewares";

export class ProfileService {
  public async viewProfile(userId: string) {
    const userExist = await prismaClient.user.findUnique({
      where: { id: userId },
      include: { employee: true },
    });
    if (!userExist) {
      throw new ResourceNotFound("User not found");
    }
    const { password, ...others } = userExist;
    return {
      data: others,
    };
  }

  public async updateProfile(userId: string, payload) {
    const { name, email, department, joiningDate } = payload;
    const userExist = await prismaClient.user.findUnique({
      where: { id: userId },
      include: { employee: true },
    });
    if (!userExist) {
      throw new ResourceNotFound("User not found");
    }
    await prismaClient.user.update({
      where: { id: userId },
      data: {
        email,
      },
    });
    await prismaClient.employee.update({
      where: { id: userExist.employeeId },
      data: {
        name,
        email,
        department,
        joiningDate: new Date(joiningDate),
      },
    });
    return {
      message: "Profile updated",
    };
  }
}
