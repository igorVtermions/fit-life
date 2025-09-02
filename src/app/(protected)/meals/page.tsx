import Dieta from "@/components/Dieta";
import React from "react";
import HeroMessage from "../home/_components/hero-message";

export default function MealsPage() {
  return (
    <>
      <HeroMessage />
      <section className="px-4">
        <Dieta />
      </section>
    </>
  );
}
