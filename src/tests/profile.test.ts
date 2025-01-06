import { ProfileService } from "../services/profile.service";
import { prismaClient } from "..";
import { ResourceNotFound } from "../middlewares";

jest.mock("..", () => ({
  prismaClient: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    employee: {
      update: jest.fn(),
    },
  },
}));

describe("ProfileService", () => {
  let profileService: ProfileService;

  beforeEach(() => {
    profileService = new ProfileService();
    jest.resetAllMocks();
  });

  describe("viewProfile", () => {
    it("should return user profile when the user exists", async () => {
      const userId = "123";
      const mockUser = {
        id: userId,
        email: "user@mail.com",
        password: "hashedPassword",
        role: "USER",
        employee: {
          id: "emp1",
          name: "John Doe",
          department: "Engineering",
          joiningDate: new Date("2023-01-01"),
        },
      };

      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(
        mockUser
      );

      const result = await profileService.viewProfile(userId);

      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { employee: true },
      });
      expect(result).toEqual({
        data: {
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
          employee: mockUser.employee,
        },
      });
    });

    it("should throw ResourceNotFound error when the user does not exist", async () => {
      const userId = "123";

      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await expect(profileService.viewProfile(userId)).rejects.toThrow(
        new ResourceNotFound("User not found")
      );

      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { employee: true },
      });
    });
  });

  describe("updateProfile", () => {
    it("should update the user's profile and return a success message", async () => {
      const userId = "123";
      const payload = {
        name: "Jane Doe",
        email: "jane.doe@mail.com",
        department: "Marketing",
        joiningDate: "2023-01-01",
      };
      const mockUser = {
        id: userId,
        email: "user@mail.com",
        employeeId: "emp1",
        employee: {
          id: "emp1",
        },
      };

      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(
        mockUser
      );
      (prismaClient.user.update as jest.Mock).mockResolvedValueOnce(null);
      (prismaClient.employee.update as jest.Mock).mockResolvedValueOnce(null);

      const result = await profileService.updateProfile(userId, payload);

      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { employee: true },
      });
      expect(prismaClient.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          email: payload.email,
        },
      });
      expect(prismaClient.employee.update).toHaveBeenCalledWith({
        where: { id: mockUser.employeeId },
        data: {
          name: payload.name,
          email: payload.email,
          department: payload.department,
          joiningDate: new Date(payload.joiningDate),
        },
      });
      expect(result).toEqual({
        message: "Profile updated",
      });
    });

    it("should throw ResourceNotFound error when the user does not exist", async () => {
      const userId = "123";
      const payload = {
        name: "Jane Doe",
        email: "jane.doe@mail.com",
        department: "Marketing",
        joiningDate: "2023-01-01",
      };

      (prismaClient.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

      await expect(
        profileService.updateProfile(userId, payload)
      ).rejects.toThrow(new ResourceNotFound("User not found"));

      expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { employee: true },
      });
      expect(prismaClient.user.update).not.toHaveBeenCalled();
      expect(prismaClient.employee.update).not.toHaveBeenCalled();
    });
  });
});
