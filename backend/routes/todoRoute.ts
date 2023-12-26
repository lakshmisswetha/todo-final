import express from "express";
import { getTodo, addTodo, deleteTodo, updateTodo } from "../controller/todoController";
import { userAuth } from "../middleware/userAuth";

const router = express.Router();

router.get("/todo", userAuth, getTodo);
router.post("/todo", userAuth, addTodo);
router.patch("/todo", userAuth, updateTodo);
router.delete("/todo", userAuth, deleteTodo);

export default router;
