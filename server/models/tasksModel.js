const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subtaskSchema = new Schema({
  subtaskTitle: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    children: [subtaskSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
