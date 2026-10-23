import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey("id"),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull().default(""),
  created_at: timestamp("ordered_at").defaultNow(),
  done: varchar("done", { length: 3 }).notNull().default("no"),
});
