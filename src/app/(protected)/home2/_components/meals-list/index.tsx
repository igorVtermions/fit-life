import React from "react";
import MealCard from "../meal-card";

const meals = [
  { name: "Panqueca de banana com aveia", time: "07:00" },
  { name: "Omelete de claras com espinafre", time: "12:00" },
  { name: "Iogurte grego com frutas vermelhas", time: "15:00" },
  { name: "Peito de frango grelhado com legumes", time: "19:00" },
  { name: "Salmão assado com quinoa", time: "21:00" },
];

export default function MealsList() {
  return (
    <div className="mt-8 flex w-full flex-col">
      <h2 className="text-xl">Refeições</h2>
      <ul>
        {meals.map((meal) => (
          <MealCard key={meal.time} name={meal.name} time={meal.time} />
        ))}
      </ul>
    </div>
  );
}
