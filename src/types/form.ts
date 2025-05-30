import { z } from "zod";

export const onboardFormSchema = z
  .object({
    config: z.object({
      currentForm: z.number(),
    }),
    data: z.object({
      role: z.enum(["recruiter", "talent"], { required_error: "Role is required" }),

      first_name: z.string().min(1, { message: "First name is required" }),
      last_name: z.string().min(1, { message: "Last name is required" }),
      state: z.string().min(1, { message: "State is required" }),
      country: z.string().min(1, { message: "Country is required" }),

      work_email: z.string()
        .email("Enter a valid work email")
        .optional()
        .or(z.literal("")),

      portfolio: z.string()
        .url("Enter a valid portfolio URL")
        .optional()
        .or(z.literal("")),

      linkedin: z.string()
        .url("Enter a valid LinkedIn URL")
        .or(z.literal("")),

      hiring_for: z.enum(["myself", "my company"])
        .optional()
        .or(z.literal("")),

      company_industry: z.string()
        .optional()
        .or(z.literal("")),

      experience_level: z.enum(["entry", "intermediate", "expert"])
        .optional()
        .or(z.literal("")),

      skills: z.array(z.string()).optional(),

      roles_looking_for: z.array(z.string()).optional(),

      resume: z.array(z.instanceof(File))
        .min(1, { message: "Please upload at least one file" })
        .refine(
          (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
          { message: "Each file must be less than 5MB" }
        ).optional()
    }),
  })

export type OnboardFormSchema = z.infer<typeof onboardFormSchema>;

export const formSteps: Record<number, (keyof OnboardFormSchema["data"])[]> = {
  1: ["role"],
  2: ["state", "work_email", "linkedin"],// exluded "first_name","last_name", "state", "country", "portfolio"
  3: ["hiring_for", "company_industry", "roles_looking_for", "experience_level", "skills", "resume"],
};

