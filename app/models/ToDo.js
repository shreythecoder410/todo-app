const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true }
)


module.exports= mongoose.model("ToDo", todoSchema)
