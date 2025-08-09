import mongoose from "mongoose";

const TestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bmi: Number,
  bmiEquivalent: String,
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
});

export const Test = mongoose.models.test || mongoose.model("Test", TestSchema);
