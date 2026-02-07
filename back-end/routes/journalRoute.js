import express from "express";
import journal from "../models/journal.js";
const routes = express.Router();

routes.get("/", async (req, res) => {
  const journalEntries = await journal.find();
  res.status(200).json({
    success: true,
    Journals: journalEntries,
    count: journalEntries.length,
  });
});

routes.get("/:id", async (req, res) => {
  const journalEntry = await journal.findById(req.params.id);

  if (!journalEntry) {
    return res.status(404).send("Page not found");
  }

  res.status(200).json({ success: true, Journal: journalEntry });
});

routes.post("/", async (req, res) => {
  const { title, content, mood } = req.body;
  if (!req.body || !title || !content || !mood) {
    return res.status(400).json({ success: false, message: "please provide all the required fields" });
  }
  const newJournal = await journal.create({
    title,
    content,
    mood,
    date: new Date(),
  });
  res.status(201).json({ success: true, journal: newJournal });
});

routes.put("/:id", async (req, res) => {
  const updateJournal = await journal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );
  if (!updateJournal) {
    return res.status(404).send("Page Not Found");
  }
  res.status(200).json({ success: true, updatedJournal: updateJournal });
});

routes.delete("/:id", async (req, res) => {
  const deleteJournal = await journal.findByIdAndDelete(req.params.id);
  if (!deleteJournal) {
    return res.status(404).send("Page Not Found");
  }
  res.status(200).json({ success: true, message: "Journal deleted" });
});

export default routes