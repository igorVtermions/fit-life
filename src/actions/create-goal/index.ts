"use server";

import { db } from "@/db";
import { goalsTable, usersToGoalsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const createGoal = async (name: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Usuário não autenticado");
  }
  const [goal] = await db.insert(goalsTable).values({ name }).returning();

  await db.insert(usersToGoalsTable).values({
    userId: session.user.id,
    goalId: goal.id,
  });
  redirect("/home");
};
