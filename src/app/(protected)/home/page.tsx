import { db } from "@/db";
import { usersToGoalsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HeroMessage from "./_components/hero-message";
import MealsList from "./_components/meals-list";
import { CardsList } from "./_components/cards-list";

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
      <HeroMessage />
      <section className="mt-8 flex w-full flex-col items-center px-5">
        <div className="flex w-full flex-nowrap gap-4 pb-4">
          <CardsList />
        </div>

        <MealsList />
      </section>
    </>
  );
}
