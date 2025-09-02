import Treino from "@/components/Treino";
import React from "react";
import HeroMessage from "../home/_components/hero-message";

export default function ExercisesPage() {
  return (
    <>
      <HeroMessage />
      <section className="px-4">
        <Treino />
      </section>
    </>
  );
}
