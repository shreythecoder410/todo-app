const ToDo = require("../models/ToDo")
const todoValidation = require("../validations/todoValidation")




class TodoController {
    async createTodo(req, res) {
        try {

            //VALIDATION
            const { error } = todoValidation.createTodo(req.body)
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }




            const todo = await ToDo.create(req.body)
            return res.status(201).json({
                success: true,
                message: "Todo created successfully",
                data: todo
            })

        } catch (error) {
            return res.status(400).json({ success: false, message: error.message })
        }
    }


    async getTodo(req, res) {
        try {

          const {
            page=1,
            limit=5,
            search="",
            completed,
            sort="desc"
          } = req.query

          const filter={}

          if(search){
            filter.title={$regex: search, $option:"i"}
          }

          if(completed !==undefined){
            filter.isCompleted = completed ==="true"
          }

          const todos = await ToDo.find(filter)
          .sort({ createdAt : sort === "asc" ?1:-1})
          .skip(skip)
          .limit(Number(limit))


          const total = await ToDo.countDocuments(filter)

          return res.status(200).json({
            success: true,
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit),
            data: todos
          })


        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }


    async getTodoById(req, res) {
        try {
            const todo = await ToDo.findById(req.params.id)

            if (!todo) {
                return res.status(404).json({
                    success: false,
                    message: "Todo not found"
                })
            }

            return res.status(200).json({
                success: true,
                data: todo
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid Id"
            })
        }
    }


    async updateTodo(req, res) {
        try {

            const { error } = todoValidation.updateTodo(req.body)
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }


            const todo = await ToDo.findByIdAndUpdate(req.params.id, req.body)
            if (!todo) {
                return res.status(404).json({
                    success: false,
                    message: "Todo not found"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Todo updated successfully",
                data: todo
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }


    async deleteTodo(req, res) {
        try {
            const todo = await ToDo.findByIdAndDelete(req.params.id)
            if (!todo) {
                return res.status(404).json({
                    success: false,
                    message: "Todo not found"
                })
            }
            return res.status(200).json({
                success: true,
                message: "Todo deleted successfully"
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }


    async toggleTodo(req, res) {
        try {
            const todo = await ToDo.findById(req.params.id)

            if (!todo) {
                return res.status(404).json({
                    success: false,
                    message: "Todo not found"
                })
            }

            todo.isCompleted = !todo.isCompleted
            await todo.save()


            return res.status(200).json({
                success: true,
                message: "Todo status updated",
                data: todo
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid todo id"
            })
        }
    }

}

module.exports = new TodoController()