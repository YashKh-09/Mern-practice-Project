import express from "express";
import journal from "../models/journal";
const routes = express.Router();

routes.get("/api/entries/", async (req, res) => {
  const journalEntries = await journal.find();
  res.status(200).json({
    success: true,
    Journals: journalEntries,
    count: journalEntries.length,
  });
});

routes.get("/api/entries/:id", async (req, res) => {
  const journalEntry = await journal.findById(req.params.id);

  if (!journalEntry) {
    return res.status(404).send("Page not found");
  }

  res.status(200).json({ success: true, Journal: journalEntry });
});

routes.post("/api/entries/", async (req, res) => {
  const { title, content, mood } = req.body;
  const newJournal = await journal.create({
    title,
    content,
    mood,
    date: new Date(),
  });
  res.status(201).json({ success: true, journal: newJournal });
});

routes.put("/api/entries/:id", async (req, res) => {
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

routes.delete("/api/entries/:id", async (req, res) => {
  const deleteJournal = await journal.findByIdAndDelete(req.params.id);
  if (!deleteJournal) {
    return res.status(404).send("Page Not Found");
  }
  res.status(200).json({ success: true, message: "Journal deleted" });
});
