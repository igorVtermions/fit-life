import Dieta from "@/components/Dieta";
import Header from "@/components/Header";
import Treino from "@/components/Treino";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  return (
    <>
      <Header />
      <h1>
        Olá, {session?.user?.name.slice(0, 7)}! Estamos felizes em ver seu
        comprometimento com essa mudança de vida.
      </h1>
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
