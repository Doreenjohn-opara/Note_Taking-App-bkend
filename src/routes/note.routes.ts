import express, { Router } from 'express';
import { 
    health,
    createNote, 
    deleteNote, 
    getAllNotes, 
    getNoteById, 
    updateNote,
    getNotesByCategory,  
    } from '../controllers/note.controllers';

const router = Router();

router.get('/health', health);
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/category/:category', getNotesByCategory)

export default router;