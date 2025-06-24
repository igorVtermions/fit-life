"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import UpsertMealForm from "../upsert-meal-form";

export default function Card({ day, title, meals }: any) {
  const [isUpsertMealDialogOpen, setIsUpsertMealDialogOpen] = useState(false);
  return (
    <div className="min-w-[340px] rounded-sm bg-zinc-900 p-2.5">
      <h2 className="mb-4 text-xl font-bold uppercase">{title}</h2>
      <ul className="flex flex-col gap-4">
        {meals
          .filter((meal: any) => meal.day == day.toLowerCase())
          .map((diet: any) => (
            <li
              key={diet.id}
              className="flex items-center justify-between rounded-sm border border-orange-600/20 px-1 py-1 hover:bg-zinc-800"
            >
              <span>
                {diet.timeToMeal.slice(0, 5)} - {diet.mealName}
              </span>
              <div className="flex gap-2">
                <Dialog
                  open={isUpsertMealDialogOpen}
                  onOpenChange={setIsUpsertMealDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer bg-orange-600 hover:bg-orange-700">
                      <SquarePen />
                    </Button>
                  </DialogTrigger>
                  <UpsertMealForm
                    meal={diet}
                    onSuccess={() => setIsUpsertMealDialogOpen(false)}
                  />
                </Dialog>
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
