const createError = require("http-errors");
const { isEmpty } = require("lodash");

const TaskLib = require("../lib/task/task.lib");
const { isValidObjectId } = require("../helpers/general.helper");

const create = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const titleToBeSaved = title?.trim();

    // Make sure title exists
    if (!titleToBeSaved) {
      throw createError(400, "Title is required");
    }

    // Create a new task
    const newTask = await TaskLib.create({
      title: titleToBeSaved,
      description,
      status,
      dueDate,
      user: req.user._id,
    });

    res.json({ task: newTask });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { user, params, body } = req;

    // Validate taskId
    validateTaskId(params.taskId);

    // Make sure body is passed
    if (isEmpty(body)) {
      throw createError(400, "body is required");
    }

    // Update the task object
    const updatedTask = await TaskLib.findOneAndUpdate(
      { _id: params.taskId, user: user._id },
      body,
      { lean: true, new: true }
    );

    res.json({ task: updatedTask });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    // Get all tasks
    const tasks = await TaskLib.find(
      { user: req.user._id },
      {},
      { lean: true, sort: { createdAt: -1 } }
    );

    res.json({ tasks });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { user, params } = req;

    // Validate taskId
    validateTaskId(params.taskId);

    // Delete a particular task
    const deletedTask = await TaskLib.findOneAndDelete({
      _id: params.taskId,
      user: user._id,
    });

    res.json({ task: deletedTask });
  } catch (error) {
    next(error);
  }
};

const validateTaskId = (taskId) => {
  // Make sure taskId is passed
  if (!taskId) {
    throw createError(400, "taskId not found");
  }

  // Make sure taskId is a valid mongoose ID
  if (!isValidObjectId(taskId)) {
    throw createError(400, "Invalid taskId");
  }
};

module.exports = { create, update, index, destroy };
