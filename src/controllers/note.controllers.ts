import express, { RequestHandler, Request, Response, NextFunction } from "express";
import Note from "../models/Note.models";
import Collaboration from "../models/collaboration.model";

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
  } catch (error: any) {
    res.status(500).json({ data: null, "Error creating note: ": error.message });
  }
};

// Get all notes
export const getAllNotes = async (req: Request, res: Response) => {
  console.log(req.user)
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error: any) {
    res.status(500).json({ data: null, "Error fetching notes": error.message });
  }
};

// Get a single note by ID
export const getNoteById:RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
    throw new Error ("Note not found" );
    }

  res.status(200).json(note);
  } catch (error: any) {
    res.status(500).json({ data: null, 'Error fetching note': error.message });
  }
};

// update a note by ID
export const updateNote = async (req: Request, res: Response) => {
  try {
    const note:any = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!note) {
      throw new Error ("Note not found" );
    }
    res.status(200).json(note);
  } catch (error: any) {
    res.status(500).json({ data: null, "Error updating note": error.message });
  }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      throw new Error ("Note not found" );
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ data: null, "Error deleting note": error });
  }
};

// get notes by category
export const getNotesByCategory = async (req: Request, res:Response) => {
  try {
    const { category } = req.params;
    const note = await Note.findOne({category});
    res.status(200).json(note);
  } catch (error: any) {
    res.status(401).json({data: null, "Error fetching note": error.message })
  }
}

// Sharing Notes via Email or Links
export const shareNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      throw new Error ("Note not found" );
    }

    const shareableLink = `${process.env.CLIENT_URL}/notes/${id}`;
    res.json({ link: shareableLink });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// 
export const addCollaborator = async (req: Request, res: Response) => {
  try {
    const { noteId, userId } = req.body;
    const collaboration = await Collaboration.findOneAndUpdate(
      { noteId },
      { $addToSet: { users: userId } },
      { new: true, upsert: true }
    );
    res.json(collaboration);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
