import { z } from "zod";

//add superfine to adjust based on roles
export const onboardFormSchema = z
  .object({
    config: z.object({
      currentForm: z.number(),
    }),
    data: z.object({
      role: z.enum(["recruiter", "talent"]).optional().or(z.literal("")),
      first_name: z.string(),
      last_name: z.string(),
      location: z.string().optional(),

      work_email: z.string().email("Enter a valid email").optional().or(z.literal("")),
      portfolio: z.string().url("Enter a valid URL").optional().or(z.literal("")),

      linkedin: z.string().url("Enter a valid URL").or(z.literal("")),

      company_industry: z.string().optional().or(z.literal("")),
      experience_level: z.enum(["entry", "intermediate", "expert"]).optional().or(z.literal("")),
      skills: z.array(z.string()).optional(),
      roles_looking_for: z.array(z.string()).optional(),

      resume: z
        .array(z.instanceof(File))
        .min(1, { message: "Please upload at least one file" })
        .refine(
          (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
          { message: "Each file must be less than 5MB" }
        )
        .optional(),
    }),
  })
// .superRefine((val, ctx) => {
//   const { role, work_email, portfolio, company_industry, experience_level, skills, roles_looking_for, resume } = val.data;
//   if (!role) {
//     ctx.addIssue({
//       path: ["data", "role"],
//       code: z.ZodIssueCode.custom,
//       message: "Please select a role",
//     });
//   }
//   if (role === "recruiter") {
//     if (!work_email || work_email === "") {
//       ctx.addIssue({
//         path: ["data", "work_email"],
//         code: z.ZodIssueCode.custom,
//         message: "Work email is required for recruiters",
//       });
//     }

//     if (!company_industry || company_industry === "") {
//       ctx.addIssue({
//         path: ["data", "company_industry"],
//         code: z.ZodIssueCode.custom,
//         message: "Company industry is required for recruiters",
//       });
//     }

//     if (!roles_looking_for || roles_looking_for.length === 0) {
//       ctx.addIssue({
//         path: ["data", "roles_looking_for"],
//         code: z.ZodIssueCode.custom,
//         message: "Please specify at least one role you're hiring for",
//       });
//     }
//   }

//   if (role === "talent") {
//     if (!portfolio || portfolio === "") {
//       ctx.addIssue({
//         path: ["data", "portfolio"],
//         code: z.ZodIssueCode.custom,
//         message: "Portfolio is required for talents",
//       });
//     }

//     if (!experience_level || experience_level === "") {
//       ctx.addIssue({
//         path: ["data", "experience_level"],
//         code: z.ZodIssueCode.custom,
//         message: "Experience level is required for talents",
//       });
//     }

//     if (!skills || skills.length === 0) {
//       ctx.addIssue({
//         path: ["data", "skills"],
//         code: z.ZodIssueCode.custom,
//         message: "Please provide at least one skill",
//       });
//     }

//     if (!resume) {
//       ctx.addIssue({
//         path: ["data", "resume"],
//         code: z.ZodIssueCode.custom,
//         message: "Resume is required for talents",
//       });
//     }
//   }
// });



export type OnboardFormSchema = z.infer<typeof onboardFormSchema>;
