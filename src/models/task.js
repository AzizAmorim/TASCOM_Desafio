import mongoose from "mongoose";

const Task = mongoose.model("Task", {
  title: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: Array
});

export default Task;