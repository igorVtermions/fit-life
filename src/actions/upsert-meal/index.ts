"use server";

import { db } from "@/db";
import { upsertMealSchema, UpsertMealSchema } from "./schema";
import { mealsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { actionClient } from "@/lib/next-safe-action";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const upsertMeal = actionClient
  .schema(upsertMealSchema)
  .action(async ({ parsedInput }) => {
    const timeToMeal = parsedInput.timeToMeal;

    const timeToMealUTC = dayjs()
      .set("hour", parseInt(timeToMeal.split(":")[0]))
      .set("minute", parseInt(timeToMeal.split(":")[1]))
      .set("second", parseInt(timeToMeal.split(":")[2]))
      .utc();

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
      .insert(mealsTable)
      .values({
        ...parsedInput,
        id: parsedInput.id,
        goalId: session?.user.goal?.id,
        timeToMeal: timeToMealUTC.format("HH:mm:ss"),
      })
      .onConflictDoUpdate({
        target: [mealsTable.id],
        set: {
          ...parsedInput,
          timeToMeal: timeToMealUTC.format("HH:mm:ss"),
        },
      });
  });
