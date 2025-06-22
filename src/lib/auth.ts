import { betterAuth } from "better-auth";
import { customSession } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { usersToGoalsTable } from "@/db/schema";

import { db } from "@/db";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  plugins: [
    customSession(async ({ user, session }) => {
      const goals = await db.query.usersToGoalsTable.findMany({
        where: eq(usersToGoalsTable.userId, user.id),
        with: {
          goal: true,
        },
      });
      // TODO: adaptar para o usuario poder ter vários objetivos
      const goal = goals?.[0];
      return {
        user: {
          ...user,
          goal: goal?.goalId
            ? {
                id: goal?.goalId,
                name: goal?.goal?.name,
              }
            : undefined,
        },
        session,
      };
    }),
  ],
  user: {
    modelName: "usersTable",
  },
  session: {
    modelName: "sessionsTable",
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
  },
});
