import { z } from "zod";

export const profileSchema = z.object({
    display_photo: z
        .union([z.instanceof(File), z.string().url()])
        .superRefine((value, ctx) => {
            if (value instanceof File && value.size > 5 * 1024 * 1024) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "File must be less than 5 MB",
                });
            }
        }),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    bio: z.string().min(1, "Bio is required").max(250, "Bio must be less than 250 characters"),
});
export type ProfileSchema = z.infer<typeof profileSchema>;
