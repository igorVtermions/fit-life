import Dieta from "@/components/Dieta";
import Header from "@/components/Header";
import Treino from "@/components/Treino";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/db";
import { usersToGoalsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  const goals = await db.query.usersToGoalsTable.findMany({
    where: eq(usersToGoalsTable.userId, session.user.id),
  });

  if (goals.length === 0) {
    redirect("/goal-form");
  }

  return (
    <>
      <Header />
      <h1 className="text-2xl">
        Olá, {session?.user?.name}! Estamos felizes em ver seu comprometimento
        com essa mudança de vida.
      </h1>
      <h2 className="text-zinc-400">Bem vindo ao seu objetivo de Cutting</h2>
      <section className="mt-20 flex w-full flex-col items-center px-5">
        <Tabs defaultValue="dieta" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="dieta">Minha Dieta</TabsTrigger>
            <TabsTrigger value="treino">Meu Treino</TabsTrigger>
          </TabsList>
          <TabsContent value="dieta" className="w-full">
            <Dieta />
          </TabsContent>
          <TabsContent value="treino">
            <Treino />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
