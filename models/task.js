const mongoose = require("mongoose");

const { TaskStatus } = require("../lib/task/task.constants");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.incomplete,
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);

module.exports.Task = Task;
