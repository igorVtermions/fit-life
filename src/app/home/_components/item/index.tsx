import React from "react";

export default function Item(diet: any) {
  return (
    <li
      key={diet.timeToMeal}
      className="rounded-sm py-1 pl-1 hover:bg-zinc-800"
    >
      <span>{diet.timeToMeal?.slice(0, 5)} - </span>
      {diet.mealName}
    </li>
  );
}
