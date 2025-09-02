import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BadgeCheck, CheckCircle2, Loader2 } from "lucide-react";
import React from "react";

export default function SubscriptionCard({
  active,
  features,
  price,
  name,
}: {
  active?: boolean;
  features: string[];
  price?: number;
  name: string;
}) {
  return (
    <Card className="min-w-[300px] flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
          {active && (
            <div className="flex items-end gap-2">
              <p className="font-semibold">Plano atual</p>
              <BadgeCheck className="text-green-700" />
            </div>
          )}
        </div>
        <p className="text-gray-600">
          Para profissionais autônomos ou pequenas clínicas
        </p>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">R${price}</span>
          <span className="ml-1 text-gray-600">/ mês</span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 border-t border-gray-200 pt-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <p className="ml-3 text-gray-600">{feature}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button
            className={`w-full ${active ? "" : "cursor-pointer"}`}
            variant="outline"
            disabled={active ? true : false}
          >
            {active ? "Gerenciar assinatura" : "Fazer assinatura"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
