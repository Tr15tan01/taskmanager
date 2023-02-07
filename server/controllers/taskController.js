const Task = require("../models/tasksModel");
const mongoose = require("mongoose");
const { findOne } = require("../models/tasksModel");

// get all workouts
const getTasks = async (req, res) => {
  const user_id = req.user._id;

  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// get a single task
const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(task);
};

// create new taskt
const createTask = async (req, res) => {
  const { title, description, deadline } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!deadline) {
    emptyFields.push("deadline");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const task = await Task.create({ title, description, deadline, user_id });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// update a workout
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { subtaskTitle } = req.body;
  // console.log("ditle is", subtaskTitle);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOne({ _id: id });
  const subTask = await task.children;
  await subTask.push(req.body);
  console.log(subTask, "after pushing");
  await task.save((err) => {
    if (err) {
      console.log(err);
    }
  });
  // await subTask.save();
  console.log("task saved", subTask);
  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

const updateSubTask = async (req, res) => {
  const { id: _id, isChecked } = req.body;
  const user_id = req.user._id;
  console.log("checked is = ", isChecked);
  const task = await Task.findOne({ _id: _id });
  const subTask = await task.children.id(req.params.id);
  subTask.completed = isChecked;
  await task.save();
  console.log("subtask is", subTask);
  const response = await Task.find({ user_id }).sort({ createdAt: -1 });
  console.log(response, "is response");

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }
  res.status(200).json(response);
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  updateSubTask,
};
