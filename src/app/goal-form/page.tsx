import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import React from "react";
import GoalForm from "./_components/form";

export default function GoalFormPage() {
  return (
    <div>
      <Dialog open>
        <DialogContent className="text-black sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Qual seu objetivo?</DialogTitle>
            <DialogDescription>ex: Bulking, Cutting</DialogDescription>
          </DialogHeader>
          <GoalForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
