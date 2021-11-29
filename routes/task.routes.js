const express = require("express");

const TasksController = require("../controllers/tasks_controller");

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks
router.get("", TasksController.index);

// @route   POST /api/tasks
// @desc    Create a new task
router.post("", TasksController.create);

// @route   PATCH /api/tasks/:taskId
// @desc    Update a particular task
router.patch("/:taskId", TasksController.update);

// @route   DELETE /api/tasks/:taskId
// @desc    Delete a particular task
router.delete("/:taskId", TasksController.destroy);

module.exports = router;
