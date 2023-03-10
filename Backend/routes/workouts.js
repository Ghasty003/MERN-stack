const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkOut,
} = require("../controller/workoutController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkOut);

router.patch("/:id", updateWorkout);

module.exports = router;
