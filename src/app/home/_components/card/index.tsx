import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import React from "react";

export default function Card({ day, title, meals }: any) {
  return (
    <div className="min-w-[340px] rounded-sm bg-zinc-900 p-2.5">
      <h2 className="text-xl font-bold uppercase">{title}</h2>
      <ul className="flex flex-col gap-4">
        {meals
          .filter((meal: any) => meal.day == day.toLowerCase())
          .map((diet: any) => (
            <li
              key={diet.timeToMeal}
              className="flex items-center justify-between rounded-sm border border-orange-600/20 py-1 pl-1 hover:bg-zinc-800"
            >
              <span>
                {diet.timeToMeal.slice(0, 5)} - {diet.mealName}
              </span>
              <div className="flex gap-2">
                <Button className="cursor-pointer bg-orange-600 hover:bg-orange-700">
                  <SquarePen />
                </Button>
                <Button className="cursor-pointer bg-orange-600 hover:bg-orange-700">
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
