import Image from "next/image";
import React from "react";

interface MealCardProps {
  name: string;
  time: string;
}

export default function MealCard({ name, time }: MealCardProps) {
  return (
    <li className="mt-4 flex max-w-[343px] flex-col gap-4">
      <h3 className="text-gray-600">Hoje, {time}</h3>
      <div className="flex items-center gap-4 rounded-2xl border-2 border-gray-100 p-3">
        <Image src="/meals.png" alt="meals image" height={48} width={48} />
        <h4 className="font-semibold">{name}</h4>
      </div>
    </li>
  );
}
