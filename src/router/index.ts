// routes/index.ts
import express from 'express';
import authentication from './authentication';
import users from './users';
import prompts from './prompts'; // Import prompts route

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  prompts(router); // Use prompts route

  return router;
};
