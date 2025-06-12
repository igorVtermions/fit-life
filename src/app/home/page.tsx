import Dieta from "@/components/Dieta";
import Header from "@/components/Header";
import Treino from "@/components/Treino";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <>
      <Header />
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
