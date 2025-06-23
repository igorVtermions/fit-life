import React from "react";

import AddMealButton from "@/app/home/_components/add-meal-button";

export default function Dieta() {
  return (
    <section>
      <AddMealButton />
      <div className="flex w-full max-w-[1280px] gap-4 overflow-auto">{}</div>
    </section>
  );
}
