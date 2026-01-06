const express=require("express")
const TodoController = require("../controller/TodoController")
const router=express.Router()

router.post("/create",TodoController.createTodo)
router.get("/create",TodoController.getTodo)
router.get("/:id", TodoController.getTodoById)
router.put("/:id",TodoController.updateTodo)
router.delete("/:id",TodoController.deleteTodo)
router.patch("/:id/toggle",TodoController.toggleTodo)


module.exports= router