const createError = require("http-errors");

const { Task } = require("../../models/task");

const create = async (doc) => {
  const task = await Task.create(doc);

  return task;
};

const findOneAndUpdate = async (filter, params, options) => {
  const task = await Task.findOneAndUpdate(filter, params, options);

  if (!task) {
    throw createError(422, "Task not found");
  }

  return task;
};

const find = async (filter, projection, options) => {
  const tasks = await Task.find(filter, projection, options);

  return tasks;
};

const findOneAndDelete = async (filter) => {
  const deletedTask = await Task.findOneAndDelete(filter);

  if (!deletedTask) {
    throw createError(422, "Task not found");
  }

  return deletedTask;
};

module.exports = { create, findOneAndUpdate, find, findOneAndDelete };
