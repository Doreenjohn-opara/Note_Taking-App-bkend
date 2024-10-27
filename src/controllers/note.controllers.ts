import express, { RequestHandler, Request, Response, NextFunction } from "express";
import Note from "../models/note.models";

// health check
export const health = async (req: Request, res: Response) => {
    res.status(200).json({message:'Welcome to Note-Taking app'})
}

// create new notes
export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

// Get all notes
export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

// Get a single note by ID
export const getNoteById:RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
    res.status(404).json({ message: "Note not found" });
    }

  res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error });
  }
};

// update a note by ID
export const updateNote = async (req: Request, res: Response) => {
  try {
    const note:any = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) {
    res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};

// get notes by category
export const getNotesByCategory = async (req: Request, res:Response) => {
  try {
    const { category } = req.params;
    const note = await Note.findOne({category});
    res.status(200).json(note);
  } catch (error) {
    res.status(401).json({message: "Error fetching note", error })
  }
}

// 
