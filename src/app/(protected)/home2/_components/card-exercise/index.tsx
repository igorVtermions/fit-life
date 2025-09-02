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
import UpsertExerciseForm from "../upsert-exercise-form";
import { useAction } from "next-safe-action/hooks";
import { deleteExercise } from "@/actions/delete-exercise";
import { toast } from "sonner";
import { exercisesTable } from "@/db/schema";

interface CardExerciseProps {
  day: string;
  title: string;
  exercises: any[];
  onSuccess?: () => void;
}

export default function CardExercise({
  day,
  title,
  exercises,
  onSuccess,
}: CardExerciseProps) {
  const [isUpsertExerciseDialogOpen, setIsUpsertExerciseDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteExerciseAction = useAction(deleteExercise, {
    onSuccess: () => {
      toast.success("Exercício deletado com sucesso!");
      setIsDeleteDialogOpen(false);
      onSuccess?.();
    },
    onError: () => {
      toast.error("Erro ao deletar exercício. Tente novamente.");
    },
  });

  const handleDeleteExerciseClick = (id: string) => {
    if (!id) return;
    deleteExerciseAction.execute({ id: id });
  };

  return (
    <div className="min-w-[340px] rounded-sm bg-zinc-200 p-2.5">
      <h2 className="mb-4 text-xl font-bold uppercase">{title}</h2>
      <ul className="flex flex-col gap-4">
        {exercises
          .filter((exercise: any) => exercise.day == day.toLowerCase())
          .map((exercise: any) => (
            <li
              key={exercise.id}
              className="flex items-center justify-between rounded-sm border border-orange-600/20 px-1 py-1 hover:bg-zinc-300"
            >
              <span>{exercise.exerciseName}</span>
              <div className="flex gap-2">
                <Dialog
                  open={isUpsertExerciseDialogOpen}
                  onOpenChange={setIsUpsertExerciseDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="cursor-pointer bg-zinc-400 hover:bg-zinc-500">
                      <SquarePen />
                    </Button>
                  </DialogTrigger>
                  <UpsertExerciseForm
                    exercise={exercise}
                    onSuccess={() => {
                      setIsUpsertExerciseDialogOpen(false);
                      onSuccess?.();
                    }}
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
                      Tem certeza que deseja excluir este exercício?
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
                        onClick={() => handleDeleteExerciseClick(exercise.id)}
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
