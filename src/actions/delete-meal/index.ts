"use server";
import { db } from "@/db";
import { mealsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

export const deleteMeal = actionClient
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
    const meal = await db.query.mealsTable.findFirst({
      where: eq(mealsTable.id, parsedInput.id),
    });
    if (meal?.goalId !== session.user.goal?.id) {
      throw new Error("Unauthorized");
    }
    await db.delete(mealsTable).where(eq(mealsTable.id, parsedInput.id));
    revalidatePath("/home");
  });
