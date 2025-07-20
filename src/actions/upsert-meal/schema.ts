import { z } from "zod";

export const upsertMealSchema = z.object({
  id: z.string().uuid().optional(),
  mealName: z
    .string()
    .trim()
    .min(1, { message: "O campo refeição é obrigatório" }),
  timeToMeal: z.string().min(1, { message: "O campo hora é obrigatório" }),
  day: z.enum([
    "domingo",
    "segunda",
    "terca",
    "quarta",
    "quinta",
    "sexta",
    "sabado",
  ]),
});

export type UpsertMealSchema = z.infer<typeof upsertMealSchema>;
