import { z } from "zod";

export const FieldSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  label: z.string().optional(),
  type: z.enum(["text", "email", "number", "date", "textarea", "select", "boolean"]),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  placeholder: z.string().optional(),
});

export const EntitySchema = z.object({
  name: z.string().min(1, "Entity name is required"),
  label: z.string().optional(),
  fields: z.array(FieldSchema).min(1, "At least one field is required"),
});

export const WidgetSchema = z.object({
  type: z.enum(["stats", "chart"]),
  title: z.string().min(1, "Widget title is required"),
  entity: z.string().optional(),
  color: z.string().optional(),
});

export const AppConfigSchema = z.object({
  name: z.string().min(1, "App name is required"),
  entities: z.array(EntitySchema).min(1, "At least one entity is required"),
  widgets: z.array(WidgetSchema).optional(),
});

export type ValidatedAppConfig = z.infer<typeof AppConfigSchema>;

export function validateConfig(config: any) {
  try {
    return { success: true, data: AppConfigSchema.parse(config) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "Invalid configuration format" };
  }
}
