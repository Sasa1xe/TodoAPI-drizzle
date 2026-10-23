import express from "express";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  getTodobyId,
  toggleTodoById,
  updateTodo,
} from "../db/todos.query.js";
import { TodoInsertSchema } from "../db/validation-schemas.js";

export const todosRouter = express.Router();

//show all todos
todosRouter.get("/", async (req, res) => {
  const books = await getAllTodos();
  res.status(200).json({
    data: books,
  });
});

//show a todo by ID
todosRouter.get("/:id", async (req, res) => {
  // const todo = await getTodobyId(req.params.id);
  // if (!todo) {
  //   return res.status(404).json({
  //     error: "Todo Not Found",
  //   });
  // }

  // res.status(200).json({ data: todo });

  const id = req.params.id;

  const todo = await getTodobyId(id);

  if (todo) {
    return res.status(200).json({
      data: todo,
    });
  } else {
    return res.status(404).json({
      message: "error",
      data: null,
    });
  }
});

//Create
todosRouter.post("/", async (req, res) => {
  const body = TodoInsertSchema.parse(req.body);
  await createTodo(body);
  return res.status(200).json({ message: "Todo Created Successfully" });
});

//update
todosRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = TodoInsertSchema.partial().parse(req.body);

  const result = await updateTodo(id, body);

  return res.status(200).json({
    message: "success",
    data: result,
  });
});
//   //checking if the todo existing or not
//   const existingTodo = await getTodobyId(req.params.id);
//   if (!existingTodo) {
//     res.status(404).json({ error: "(404) ToDo not Found" });
//   }

//   if (!String(req.body.title).trim())
//     return res.status(400).json({ error: "title can't be empty" });

//   const result = await updateTodo(req.params.id,req.body);

//   res.status(200).json({ message: "Todo Updated", data: result });

//toggle
todosRouter.patch("/:id/toggle", async (req, res) => {
  const id = req.params.id;
  await toggleTodoById(id);

  res.status(200).json({
    message: "done",
  });
  console.log(body);
});

//delete
todosRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const checkExisting = await getTodobyId(id);
  if (!checkExisting) {
    return res.status(404).json({
      error: "Todo not Found",
    });
  }
  await deleteTodoById(id);
  res.status(200).json({
    message: "Todo Deleted",
  });
});
