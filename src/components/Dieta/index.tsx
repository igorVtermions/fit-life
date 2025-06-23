import React from "react";

import AddMealButton from "@/app/home/_components/add-meal-button";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { mealsTable } from "@/db/schema";
import { db } from "@/db";
import { auth } from "@/lib/auth";

export default async function Dieta() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const meals = await db.query.mealsTable.findMany({
    where: eq(mealsTable.goalId, session?.user.goal?.id),
  });
  return (
    <section>
      <AddMealButton />
      <div className="flex w-full max-w-[1280px] gap-4 overflow-auto">
        {meals.map((meal) => (
          <li>
            {meal.timeToMeal.slice(0, 5)} - {meal.mealName}
          </li>
        ))}
      </div>
    </section>
  );
}
