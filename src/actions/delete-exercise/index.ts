"use server";
import { db } from "@/db";
import { exercisesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

export const deleteExercise = actionClient
  .schema(
    z.object({
      id: z.string().uuid(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("Unauthorized");
    }
    const exercise = await db.query.exercisesTable.findFirst({
      where: eq(exercisesTable.id, parsedInput.id),
    });
    if (exercise?.goalId !== session.user.goal?.id) {
      throw new Error("Unauthorized");
    }
    await db
      .delete(exercisesTable)
      .where(eq(exercisesTable.id, parsedInput.id));
    revalidatePath("/home");
  });
