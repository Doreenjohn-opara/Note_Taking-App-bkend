import express, { Router } from "express";
import {
  health,
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
  getNotesByCategory,
  addCollaborator,
} from "../controllers/note.controllers";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/health", health);
router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getAllNotes);
router.get("/:id", authMiddleware, getNoteById);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);
router.get("/category/:category", authMiddleware, getNotesByCategory);
router.post("/collaborate", authMiddleware, addCollaborator);

export default router;
