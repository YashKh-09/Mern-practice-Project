import mongoose, { Schema } from "mongoose";

const journalData = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
    enum: ["Happy", "Sad", "Angry", "Neutral", "Excited"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const journal = mongoose.model("Journal", journalData);
export default journal