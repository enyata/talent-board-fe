import { z } from "zod";

export const onboardFormSchema = z.object({
  config: z.object({
    currentForm: z.number(),
  }),
  data: z.object({
    role: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    location: z.string().optional(),
    work_email: z.string().email("Enter a valid email").optional().or(z.literal("")),
    portfolio: z.string().url("Enter a valid URL").optional().or(z.literal("")),
    linkedin: z.string().url("Enter a valid URL").optional().or(z.literal("")),
    company_industry: z.string().optional(),
    experience_level: z.string().optional(),
    skills: z.array(z.string()).optional(),
    resume: z
      .any()
      .refine((file) => file instanceof File, {
        message: "Please upload a file",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File must be less than 5MB",
      })
      .optional(),
  }),
});

export type OnboardFormSchema = z.infer<typeof onboardFormSchema>;
