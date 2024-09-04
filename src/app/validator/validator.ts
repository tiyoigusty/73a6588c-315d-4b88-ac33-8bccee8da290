import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  position: z.string().min(1, { message: "Position is required." }),
  phone: z
    .string()
    .min(6, { message: "Phone number must be between 6 and 14 digits." })
    .max(14, { message: "Phone number must be between 6 and 14 digits." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
});
