"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useAction } from "next-safe-action/hooks";
import { upsertExercise } from "@/actions/upsert-exercise";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { exercisesTable } from "@/db/schema";
import { upsertExerciseSchema } from "@/actions/upsert-exercise/schema";

const days = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

interface UpsertExerciseFormProps {
  exercise?: typeof exercisesTable.$inferInsert;
  onSuccess?: () => void;
}

const UpsertExerciseForm = ({
  exercise,
  onSuccess,
}: UpsertExerciseFormProps) => {
  useEffect(() => {}, [exercise]);

  const form = useForm<z.infer<typeof upsertExerciseSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(upsertExerciseSchema),
    defaultValues: {
      ...(exercise?.id ? { id: exercise.id } : {}),
      exerciseName: exercise?.exerciseName ?? "",
      day: exercise?.day ?? "domingo",
    },
  });

  const upsertExerciseAction = useAction(upsertExercise, {
    onSuccess: () => {
      toast.success("Exercício salvo com sucesso!");
      onSuccess?.();
    },
    onError: (error) => {
      // Tenta mostrar mensagens amigáveis de erro
      let msg = "Erro ao salvar exercício.";
      if (error?.error?.serverError) {
        msg += " " + error.error.serverError;
      } else if (error?.error?.validationErrors) {
        const val = error.error.validationErrors;
        const allMsgs = [
          ...(val.exerciseName?._errors || []),
          ...(val.day?._errors || []),
          ...(val.id?._errors || []),
          ...(val._errors || []),
        ];
        if (allMsgs.length) msg += " " + allMsgs.join(" | ");
      }
      toast.error(msg);
    },
  });

  const isValidUUID = (id?: string) => {
    if (!id) return false;
    // Regex UUID v4
    return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id,
    );
  };

  const onSubmit = (values: z.infer<typeof upsertExerciseSchema>) => {
    try {
      const payload = { ...values };
      if (!isValidUUID(payload.id)) delete payload.id;
      upsertExerciseAction.execute(payload);
    } catch (err) {
      toast.error(
        "Erro inesperado no submit: " +
          (err instanceof Error ? err.message : JSON.stringify(err)),
      );
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-black">
          {exercise ? exercise.exerciseName : "Adicione um exercício"}
        </DialogTitle>
        <DialogDescription>
          {exercise
            ? "Edite os detalhes do exercício"
            : "Adicione um novo exercício ao seu treino."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (zodErrors) => {
            // Extrai mensagens amigáveis do erro de validação
            const allMsgs: string[] = [];
            if (zodErrors.exerciseName?.message)
              allMsgs.push(zodErrors.exerciseName.message);
            if (zodErrors.day?.message) allMsgs.push(zodErrors.day.message);
            if (zodErrors.id?.message) allMsgs.push(zodErrors.id.message);
            toast.error(
              "Erro de validação: " +
                (allMsgs.length ? allMsgs.join(" | ") : "Verifique os campos."),
            );
          })}
        >
          {exercise?.id && <input type="hidden" {...form.register("id")} />}
          <FormField
            name="exerciseName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-black">Exercício:</FormLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="Nome do exercício"
                  className="w-full rounded-md border border-gray-300 p-2 text-black focus:border-orange-500 focus:outline-none"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="day"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-4 text-black">Dia:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full text-black">
                      <SelectValue placeholder="Selecione um dia da semana" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={upsertExerciseAction.isPending}
            className="my-4 h-[50px] w-full cursor-pointer rounded-md bg-orange-600 hover:bg-orange-700"
          >
            {upsertExerciseAction.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {exercise ? "Salvar" : "Adicionar"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertExerciseForm;
