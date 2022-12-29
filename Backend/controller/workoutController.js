const Workouts = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workouts.find({ user_id }).sort({ createdAt: -1 });

  try {
    res.status(200).json(workouts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const workout = await Workouts.findById(id);

  if (!workout) {
    return res.status(404).json({ message: "Such workout does not exits" });
  }

  res.status(200).json(workout);
};

//create a new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  const emptyField = [];

  if (!title) {
    emptyField.push("title");
  }

  if (!reps) {
    emptyField.push("reps");
  }

  if (!load) {
    emptyField.push("load");
  }

  if (emptyField.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill out all fields", emptyField });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workouts.create({ title, reps, load, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete workout
const deleteWorkOut = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "such doc does not exits" });
  }

  const workout = await Workouts.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "such doc doesnt exist" });
  }

  res.status(200).json(workout);
};

// update a doc
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such document" });
  }

  const workout = await Workouts.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    res.status(404).json({ error: "no such document" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkOut,
  updateWorkout,
};
