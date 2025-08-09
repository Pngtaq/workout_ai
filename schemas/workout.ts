import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
  days: [
    {
      cooldown: [String],
      day: String,
      mainWorkout: String,
      warmup: [String],
    },
  ],
  dietTips: {
    hydration: String,
    meals: [String],
    postWorkout: [String],
    preWorkout: [String],
  },
  overview: {
    daysPerWeek: Number,
    dietTips: String,
    duration: String,
    focus: String,
  },
});

export const Workout =
  mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema);
