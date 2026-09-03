import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address format."),
  organization: z.string().min(2, "Organization name must be at least 2 characters."),
  projectType: z.string().default("Web Application"),
  budgetRange: z.string().default("$2,500 - $5,000"),
  description: z.string().min(20, "Description must be at least 20 characters."),
});

export const projectIntakeSchema = z.object({
  projectGoal: z.string().min(5, "Project goal must be at least 5 characters."),
  problemToSolve: z.string().min(10, "Problem description must be at least 10 characters."),
  targetUsers: z.string().optional().default("General Users"),
  projectStage: z.string().default("Idea"),
  projectType: z.array(z.string()).min(1, "Select at least one project category."),
  timeline: z.string().default("1-3 months"),
  budget: z.string().default("MVP ($5,000 - $10,000)"),
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address format."),
  organization: z.string().min(2, "Organization must be at least 2 characters."),
  additionalNotes: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectIntakeInput = z.infer<typeof projectIntakeSchema>;
