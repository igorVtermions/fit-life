"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Dieta() {
  return (
    <section>
      <Dialog>
        <DialogTrigger className="my-8 h-[50px] w-[170px] cursor-pointer rounded-md bg-orange-700 hover:bg-orange-600">
          Adicionar refeição
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black">
              Adicione uma refeição
            </DialogTitle>
            <input
              type="text"
              placeholder="Refeição"
              className="pl-2 text-black placeholder:text-gray-800"
            />
            <input type="time" className="pl-2 text-black" />
            <select className="pl-2 text-black">
              <option value="domingo">domingo</option>
              <option value="segunda">segunda-feira</option>
              <option value="terça">terça-feira</option>
              <option value="quarta">quarta-feira</option>
              <option value="quinta">quinta-feira</option>
              <option value="sexta">sexta-feira</option>
              <option value="sabado">sabado</option>
            </select>
            <button className="my-4 h-[50px] w-[170px] cursor-pointer rounded-md bg-orange-700 hover:bg-orange-600">
              Adicionar
            </button>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="flex w-full max-w-[1280px] gap-4 overflow-auto">{}</div>
    </section>
  );
}
