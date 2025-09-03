"use client";
import React, { useEffect, useState } from "react";
import AddExerciseButton from "@/app/(protected)/home2/_components/add-exercise-button";
import CardExercise from "@/app/(protected)/home2/_components/card-exercise";
// import { fetchExercises } from "./fetch-exercises";

const weekDays = [
  "Segunda",
  "Terca",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
  "Domingo",
];

export default function Treino() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExercises = () => {
    setLoading(true);
    fetch("/api/exercises")
      .then((res) => res.json())
      .then((data) => setExercises(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <section className="w-full">
      <AddExerciseButton onSuccess={loadExercises} />
      <div className="mx-auto flex w-full max-w-[1280px] gap-4 overflow-auto">
        {weekDays.map((day) => (
          <CardExercise
            key={day}
            title={day}
            day={day}
            exercises={exercises}
            onSuccess={loadExercises}
          />
        ))}
      </div>
    </section>
  );
}
