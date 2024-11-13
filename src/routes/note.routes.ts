import express, { Router } from 'express';
import { 
    health,
    createNote, 
    deleteNote, 
    getAllNotes, 
    getNoteById, 
    updateNote,
    getNotesByCategory,
    addCollaborator,  
    } from '../controllers/note.controllers';
import protect from '../middleware/auth.middleware';

const router = Router();

router.get('/health', health);
router.post('/', protect, createNote);
router.get('/', protect, getAllNotes);
router.get('/:id',protect,  getNoteById);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);
router.get('/category/:category', protect, getNotesByCategory);
router.post('/collaborate', protect, addCollaborator);

export default router;