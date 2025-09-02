import React from "react";
import SubscriptionCard from "./_components/subscription-card";

export default function SubscriptionPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold">Escolha seu plano:</h1>
      <div className="flex w-full max-w-4xl gap-8 pt-8 md:flex-row">
        <SubscriptionCard
          features={["teste", "teste2", "teste3"]}
          active
          price={0}
          name="Start"
        />
        <SubscriptionCard
          features={["teste", "teste2", "teste3"]}
          price={59}
          name="Essential"
        />
      </div>
    </section>
  );
}
