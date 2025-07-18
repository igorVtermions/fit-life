import { db } from "@/db";
import { exercisesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function fetchExercises() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.goal) {
    throw new Error("Goal not found");
  }
  const exercises = await db.query.exercisesTable.findMany({
    where: eq(exercisesTable.goalId, session?.user.goal?.id),
  });
  return exercises;
}
