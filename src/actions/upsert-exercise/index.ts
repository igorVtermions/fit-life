"use server";

import { db } from "@/db";
import { upsertExerciseSchema } from "./schema";
import { exercisesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import { revalidatePath } from "next/cache";

export const upsertExercise = actionClient
  .schema(upsertExerciseSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      throw new Error("User not authenticated");
    }
    if (!session?.user.goal?.id) {
      throw new Error("Goal not found");
    }
    await db
      .insert(exercisesTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        goalId: session?.user.goal?.id,
      })
      .onConflictDoUpdate({
        target: [exercisesTable.id],
        set: {
          ...parsedInput,
        },
      });
    revalidatePath("/home");
  });
