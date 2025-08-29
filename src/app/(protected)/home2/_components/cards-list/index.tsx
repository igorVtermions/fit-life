import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FeaturedCard from "@/components/featured-card";

export function CardsList() {
  return (
    <Carousel className="mt-4 w-full sm:mt-10 [&>div]:overflow-visible">
      <CarouselContent>
        <CarouselItem className="basis-1/1 sm:basis-1/2">
          <FeaturedCard
            link="/exercises"
            buttonText="Ver treino"
            imageurl="/woman.png"
            title="Preparado para o treino de hoje?"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/1 sm:basis-1/2">
          <FeaturedCard
            link="/meals"
            buttonText="Ver dieta"
            imageurl="/man.png"
            title="Seguindo a dieta a risca?"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
