import { DashboardService } from "../services/dashboard.service";
import { prismaClient } from "..";

jest.mock("..", () => ({
  prismaClient: {
    employee: {
      count: jest.fn(),
      groupBy: jest.fn(),
    },
  },
}));

describe("DashboardService", () => {
  let dashboardService: DashboardService;

  beforeEach(() => {
    dashboardService = new DashboardService();
    jest.resetAllMocks();
  });

  describe("countEmployees", () => {
    it("should return the total number of employees and employees per department", async () => {
      const mockTotalEmployees = 10;
      const mockEmployeesPerDepartmentArray = [
        { department: "Engineering", _count: { department: 4 } },
        { department: "Marketing", _count: { department: 3 } },
        { department: "HR", _count: { department: 3 } },
      ];

      (prismaClient.employee.count as jest.Mock).mockResolvedValueOnce(
        mockTotalEmployees
      );
      (prismaClient.employee.groupBy as jest.Mock).mockResolvedValueOnce(
        mockEmployeesPerDepartmentArray
      );

      const result = await dashboardService.countEmployees();

      expect(prismaClient.employee.count).toHaveBeenCalledTimes(1);
      expect(prismaClient.employee.groupBy).toHaveBeenCalledWith({
        by: "department",
        _count: { department: true },
      });

      expect(result).toEqual({
        data: {
          totalEmployees: mockTotalEmployees,
          employeesPerDepartment: [
            { department: "Engineering", count: 4 },
            { department: "Marketing", count: 3 },
            { department: "HR", count: 3 },
          ],
        },
      });
    });

    it("should return empty employeesPerDepartment when no employees exist", async () => {
      const mockTotalEmployees = 0;
      const mockEmployeesPerDepartmentArray: any[] = [];

      (prismaClient.employee.count as jest.Mock).mockResolvedValueOnce(
        mockTotalEmployees
      );
      (prismaClient.employee.groupBy as jest.Mock).mockResolvedValueOnce(
        mockEmployeesPerDepartmentArray
      );

      const result = await dashboardService.countEmployees();

      expect(prismaClient.employee.count).toHaveBeenCalledTimes(1);
      expect(prismaClient.employee.groupBy).toHaveBeenCalledWith({
        by: "department",
        _count: { department: true },
      });

      expect(result).toEqual({
        data: {
          totalEmployees: mockTotalEmployees,
          employeesPerDepartment: [],
        },
      });
    });
  });
});
