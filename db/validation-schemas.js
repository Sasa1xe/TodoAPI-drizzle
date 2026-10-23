import { createInsertSchema, createSelectSchema } from "drizzle-orm/zod"
import { todos } from "./schema.js"

export const TodoSelectSchema= createSelectSchema(todos)
export const TodoInsertSchema= createInsertSchema(todos)