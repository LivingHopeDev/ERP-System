import { z } from "zod";

export const ProfileSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  department: z.string(),
  joiningDate: z.string(),
});
