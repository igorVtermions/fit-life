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

  if (!session?.user?.goal) {
    redirect("/goal-form");
  }

  const goals = await db.query.usersToGoalsTable.findMany({
    where: eq(usersToGoalsTable.userId, session.user.id),
  });

  if (goals.length === 0) {
    redirect("/goal-form");
  }

  return (
    <>
      <h1 className="mt-8 px-5 text-2xl font-semibold">
        Olá, {session?.user?.name}!
      </h1>
      <h2 className="px-5 text-zinc-400">
        Essa é sua rotina de <strong>{session.user.goal.name}</strong>
      </h2>
      <section className="mt-10 flex w-full flex-col items-center px-5">
        Content
      </section>
    </>
  );
}
