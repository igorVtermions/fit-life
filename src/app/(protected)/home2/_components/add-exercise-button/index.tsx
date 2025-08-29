"use client";
import React, { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpsertExerciseForm from "../upsert-exercise-form";

interface AddExerciseButtonProps {
  onSuccess?: () => void;
}

const AddExerciseButton = ({ onSuccess }: AddExerciseButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess?.();
  };
  const handleOpenChange = (open: boolean) => {
    console.log("Dialog AddExerciseButton aberto?", open);
    setIsOpen(open);
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger className="my-8 h-[50px] w-[170px] cursor-pointer rounded-md bg-orange-700 hover:bg-orange-600">
        Adicionar exercício
      </DialogTrigger>
      <UpsertExerciseForm onSuccess={handleSuccess} />
    </Dialog>
  );
};

export default AddExerciseButton;
