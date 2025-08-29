"use client";
import React, { useState } from "react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpsertMealForm from "../upsert-meal-form";

const AddMealButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="my-8 h-[50px] w-[170px] cursor-pointer rounded-md bg-orange-700 hover:bg-orange-600">
        Adicionar refeição
      </DialogTrigger>
      <UpsertMealForm onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};

export default AddMealButton;
