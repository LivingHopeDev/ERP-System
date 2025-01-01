import { z } from "zod";

export const EmployeeSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  department: z.string(),
  role: z.string().optional(),
  salary: z.number().positive("Salary must be a positive number"),
  joiningDate: z.string(),
});
