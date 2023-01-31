const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
  updateSubTask,
} = require("../controllers/taskController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get("/", getTasks);

//GET a single workout
router.get("/:id", getTask);

// POST a new workout
router.post("/", createTask);

// DELETE a workout
router.delete("/:id", deleteTask);

// UPDATE a task
router.patch("/:id", updateTask);

//update subtask
router.patch("/:id/subtask/:id", updateSubTask);

module.exports = router;
