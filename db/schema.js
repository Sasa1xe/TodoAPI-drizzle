import { pgTable, serial, primaryKey, varchar, text, timestamp } from "drizzle-orm/pg-core"

export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: varchar("name", { length: 255 }).notNull(),
    body: text().notNull().default(''),
    created_at: timestamp().notNull.defaultnow(),
    done: varchar("done", { length: 3 }).notNull().default("no"),
})