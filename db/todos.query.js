import { eq, sql } from "drizzle-orm";
import { db } from "./db.js";
import { todos } from "./schema.js";

export async function getAllTodos() {
  const data = await db.select().from(todos);
  return data;
}

export async function getTodobyId(id) {
  const data = await db
    .select({
      id: todos.id,
      title: todos.title,
      created_at: todos.created_at,
      done: todos.done,
    })
    .from(todos)
    .where(eq(todos.id, id))
    .limit(1);

  if (data.length) {
    return data[0];
  } else {
    return false;
  }
}

export async function createTodo({ title, body }) {
  const res = await db
    .insert(todos)
    .values({
      title: title,
      body: body,
    })
    .returning();
  return res;
}

export async function updateTodo(id, body) {
  // const res = await db
  //   .update(todos)
  //   .set({body: body})
  //   .where(eq (todos.id, id)).returning();

  // return res;

  const result = await db
    .update(todos)
    .set(body)
    .where(eq(todos.id, id))
    .returning();

  return result;
}

export async function toggleTodoById(id) {
  const [updated] = await db
    .update(todos)
    .set({
      done: sql`CASE WHEN ${todos.done} = 'yes' THEN 'no' ELSE 'yes' END`,
    })
    .where(eq(todos.id, id))
    .returning();

  return updated;
}

export async function deleteTodoById(id) {
  const res = await db.delete(todos).where(eq(todos.id, id)).returning();
  return res;
}
