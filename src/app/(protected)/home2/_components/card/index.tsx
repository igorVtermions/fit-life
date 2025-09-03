"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import UpsertMealForm from "../upsert-meal-form";
import { useAction } from "next-safe-action/hooks";
import { deleteMeal } from "@/actions/delete-meal";
import { toast } from "sonner";
interface mealsProps {
  id: string;
  goalId: string;
  mealName: string;
  timeToMeal: string;
  day:
    | "domingo"
    | "segunda"
    | "terca"
    | "quarta"
    | "quinta"
    | "sexta"
    | "sabado";
}

export default function Card({ day, title, meals }: any) {
  const [isUpsertMealDialogOpen, setIsUpsertMealDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteMealAction = useAction(deleteMeal, {
    onSuccess: () => {
      toast.success("Refeição deletada com sucesso!");
      setIsDeleteDialogOpen(false);
    },
    onError: () => {
      toast.error("Erro ao deletar refeição. Tente novamente.");
    },
  });

  const handleDeleteMealClick = (id: string) => {
    if (!id) return;
    deleteMealAction.execute({ id: id });
  };

  return (
    <div className="min-h-[340px] min-w-[340px] rounded-sm bg-zinc-200 p-2.5">
      <h2 className="mb-4 text-xl font-bold uppercase">{title}</h2>
      <ul className="flex flex-col gap-4">
        {meals
          .filter((meal: any) => meal.day == day.toLowerCase())
          .sort((a: mealsProps, b: mealsProps) =>
            a.timeToMeal.localeCompare(b.timeToMeal),
          )
          .map((diet: any) => (
            <li
              key={diet.id}
              className="flex items-center justify-between rounded-sm border border-orange-600/20 px-1 py-1 hover:bg-zinc-300"
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
                    <Button className="cursor-pointer bg-zinc-400 hover:bg-zinc-500">
                      <SquarePen />
                    </Button>
                  </DialogTrigger>
                  <UpsertMealForm
                    meal={diet}
                    onSuccess={() => setIsUpsertMealDialogOpen(false)}
                  />
                </Dialog>
                <Dialog
                  open={isDeleteDialogOpen}
                  onOpenChange={setIsDeleteDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer bg-zinc-400 hover:bg-zinc-500">
                      <Trash2 />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle className="text-black">
                      Tem certeza que deseja excluir esta refeição?
                    </DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita.
                    </DialogDescription>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="mr-2 cursor-pointer text-black"
                        onClick={() => setIsDeleteDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="cursor-pointer bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteMealClick(diet.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
