// routes/prompts.ts
import express from 'express';
import { getAllPrompts, createPrompt, deletePrompt, updatePrompt } from '../controllers/prompts';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
  router.get('/prompts', getAllPrompts);
  router.post('/prompts', isAuthenticated, createPrompt);
  router.delete('/prompts/:id', isAuthenticated, isOwner, deletePrompt);
  router.patch('/prompts/:id', isAuthenticated, isOwner, updatePrompt);
};

