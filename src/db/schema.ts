import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToGoals: many(usersToGoalsTable),
}));

export const sessionsTable = pgTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const accountsTable = pgTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verificationsTable = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const goalsTable = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const goalsTableRelations = relations(goalsTable, ({ many }) => ({
  meals: many(mealsTable),
  exercises: many(exercisesTable),
  userToGoals: many(usersToGoalsTable),
}));

export const usersToGoalsTable = pgTable("user_to_goals", {
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  goalId: uuid("goals_id")
    .notNull()
    .references(() => goalsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersToGoalsTableRelations = relations(
  usersToGoalsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [usersToGoalsTable.userId],
      references: [usersTable.id],
    }),
    goal: one(goalsTable, {
      fields: [usersToGoalsTable.goalId],
      references: [goalsTable.id],
    }),
  }),
);

export const weekDays = pgEnum("meal_day_enum", [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
]);

export const mealsTable = pgTable("meals", {
  id: uuid("id").defaultRandom().primaryKey(),
  mealName: text("meal_name").notNull(),
  timeToMeal: time("time_to_meal").notNull(),
  day: weekDays("day").notNull(),
  goalId: uuid("goal_id")
    .notNull()
    .references(() => goalsTable.id, { onDelete: "cascade" }),
});

export const mealsTableRelations = relations(mealsTable, ({ one }) => ({
  goal: one(goalsTable, {
    fields: [mealsTable.goalId],
    references: [goalsTable.id],
  }),
}));

export const exercisesTable = pgTable("exercises", {
  id: uuid("id").defaultRandom().primaryKey(),
  exerciseName: text("exercise_name").notNull(),
  day: weekDays("day").notNull(),
  goalId: uuid("goal_id")
    .notNull()
    .references(() => goalsTable.id, { onDelete: "cascade" }),
});

export const exercisesTableRelations = relations(exercisesTable, ({ one }) => ({
  goal: one(goalsTable, {
    fields: [exercisesTable.goalId],
    references: [goalsTable.id],
  }),
}));
