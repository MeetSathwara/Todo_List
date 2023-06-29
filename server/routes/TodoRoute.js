const express = require("express");
const { createTodo, GetTodo, UpdateTodo, DeleteTodo } = require("../controller/TodoController");

const route = express.Router();

route.post("/create", createTodo);
route.get("/GetAllList", GetTodo);
route.put("/UpdateList/:id", UpdateTodo);
route.delete("/DeleteList/:id", DeleteTodo);


module.exports = route;