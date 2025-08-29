import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function HeroMessage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="-mt-7 flex h-24 flex-col justify-center bg-green-500 px-5">
      <h1 className="text-2xl font-semibold">Olá, {session?.user?.name}!</h1>
      <h2 className="text-zinc-600">
        Essa é sua rotina de <strong>{session?.user?.goal?.name}</strong>
      </h2>
    </section>
  );
}
