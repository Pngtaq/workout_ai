import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, index: true }, // Add index for faster lookups
  weight: Number,
  bmi: Number,
  bmiEquivalent: String,
  heightInFeet: { type: Number, min: 1, max: 10 },
  heightInInches: { type: Number, min: 1, max: 10 },
  age: { type: Number },
  gender: { type: String },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
  image: String,
  workout: {
    days: [
      {
        _id: false,
        cooldown: [String],
        day: String,
        mainWorkout: [String],
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
      dietTip: String,
      duration: String,
      focus: String,
    },
  },
});

// Add compound index for better query performance
UserSchema.index({ email: 1, updatedAt: -1 });

// Add text index for search functionality (if needed in future)
// UserSchema.index({ firstName: 'text', lastName: 'text' });

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
