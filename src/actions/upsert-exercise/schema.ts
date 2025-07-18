import { z } from "zod";

export const upsertExerciseSchema = z.object({
  id: z.string().uuid().optional(),
  exerciseName: z
    .string()
    .trim()
    .min(1, { message: "O campo exercício é obrigatório" }),
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

export type UpsertExerciseSchema = z.infer<typeof upsertExerciseSchema>;
