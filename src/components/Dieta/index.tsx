import React from "react";

import AddMealButton from "@/app/(protected)/home2/_components/add-meal-button";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { mealsTable } from "@/db/schema";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import Card from "@/app/(protected)/home2/_components/card";

export default async function Dieta() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.goal) {
    throw new Error("Goal not found");
  }

  const meals = await db.query.mealsTable.findMany({
    where: eq(mealsTable.goalId, session?.user.goal?.id),
  });

  const weekDays = [
    "Segunda",
    "Terca",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sabado",
    "Domingo",
  ];

  return (
    <section className="flex flex-col items-end md:items-start">
      <AddMealButton />
      <div className="mx-auto flex w-full max-w-[1280px] gap-4 overflow-auto">
        {weekDays.map((day) => (
          <Card key={day} title={day} day={day} meals={meals} />
        ))}
      </div>
    </section>
  );
}
