const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
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

// UPDATE a workout
router.patch("/:id", updateTask);

module.exports = router;
