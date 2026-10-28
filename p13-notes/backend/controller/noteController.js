
const Note = require("../models/Note");

// Create a note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({ title, content });

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote
};
