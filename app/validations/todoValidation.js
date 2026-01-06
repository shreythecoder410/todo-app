const Joi =require("joi")


class TodoValidation{

    static createTodo(data){
        const schema = Joi.object({
            title: Joi.string().min(3).max(20).trim().required(),
            description: Joi.string().min(10).max(30).optional(),
            isCompleted: Joi.boolean().optional()
        });

        return schema.validate(data)
    }



    static updateTodo(data){
        const schema = Joi.object({
            title: Joi.string().min(3).max(20).trim().required(),
            decription:Joi.string().min(10).max(30).trim().optional(),
            isCompleted: Joi.boolean().optional()
        });

        return schema.validate(data)
    }
}


module.exports = TodoValidation