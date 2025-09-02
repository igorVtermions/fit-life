import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FeaturedCard from "@/components/featured-card";

export function CardsList() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] justify-evenly gap-4">
      <FeaturedCard
        link="/exercises"
        buttonText="Ver treino"
        imageurl="/woman.png"
        title="Preparado para o treino de hoje?"
      />
      <FeaturedCard
        link="/meals"
        buttonText="Ver dieta"
        imageurl="/man.png"
        title="Seguindo a dieta a risca?"
        className="hidden lg:flex"
      />
    </div>
  );
}
