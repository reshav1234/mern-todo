const mongoose = require("mongoose");

// creating schema
const TodoSchema = new mongoose.Schema({
  title: {
    type: "String",
    required: true,
  },
  description: {
    type: "String",
  },
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
