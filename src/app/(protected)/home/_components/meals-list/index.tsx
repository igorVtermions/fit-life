import React from "react";
import MealCard from "../meal-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { mealsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function MealsList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.goal) {
    throw new Error("Goal not found");
  }

  const meals = await db.query.mealsTable.findMany({
    where: eq(mealsTable.goalId, session?.user.goal?.id),
  });

  const dias = [
    "Domingo",
    "Segunda",
    "Terca",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
  ];

  const hoje = new Date();
  const diaSemana = dias[hoje.getDay()];

  const todayMeals = meals
    .filter((meal) => meal.day === diaSemana.toLocaleLowerCase())
    .sort((a, b) => a.timeToMeal.localeCompare(b.timeToMeal));

  return (
    <div className="mt-8 flex w-full flex-col">
      <h2 className="text-xl">Refeições</h2>
      <ul>
        {todayMeals.map((meal) => (
          <MealCard
            key={meal.id}
            name={meal.mealName}
            time={meal.timeToMeal.slice(0, 5)}
          />
        ))}
      </ul>
    </div>
  );
}
