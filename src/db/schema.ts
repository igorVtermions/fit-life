import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  usersToGoals: many(usersToGoalsTable),
}));

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
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  goalsId: uuid("goals_id")
    .notNull()
    .references(() => goalsTable.id),
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
      fields: [usersToGoalsTable.goalsId],
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
  exerciseName: text("meal_name").notNull(),
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
