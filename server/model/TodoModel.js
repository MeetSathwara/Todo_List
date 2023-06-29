const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
})

const Todomodel = mongoose.model("Todos", TodoSchema);

module.exports = Todomodel