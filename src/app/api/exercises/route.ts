import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exercisesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session?.user?.goal) {
    return NextResponse.json([], { status: 401 });
  }
  const exercises = await db.query.exercisesTable.findMany({
    where: eq(exercisesTable.goalId, session.user.goal.id),
  });
  return NextResponse.json(exercises);
}
