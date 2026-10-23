import express from "express";
import { todosRouter } from "./routes/todos.routes.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date().toLocaleString(), req.method, req.url);
  next();
});

//---routes---
app.use("/todos", todosRouter);

//---error handlers---
app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.use((err, req, res, next) => {
  console.error("err", err);
  res.status(500).json({
    error: "something went wrong",
  });
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
