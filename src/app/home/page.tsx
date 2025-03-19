import Dieta from "@/components/Dieta";
import Header from "@/components/Header";
import Treino from "@/components/Treino";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Home() {
  return (
    <>
      <Header />
      <section className="w-full flex flex-col items-center mt-20 px-5">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="dieta">Minha Dieta</TabsTrigger>
            <TabsTrigger value="treino">Meu Treino</TabsTrigger>
          </TabsList>
          <TabsContent value="dieta" className="w-full"><Dieta /></TabsContent>
          <TabsContent value="treino"><Treino /></TabsContent>
        </Tabs>
      </section>
    </>
  );
}
