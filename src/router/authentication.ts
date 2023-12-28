import express from 'express';

import { login, register,logout, checkAuth } from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
  router.post('/logout',logout)
  router.get('/checkAuth', checkAuth)
};
