import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);
    
    if (user.authentication.password != expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());

    await user.save();

    res.cookie('ANTONIO-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    res.cookie('USERNAME', user.username, { domain: 'localhost', path: '/' });
    res.cookie('USERID', user.id, { domain: 'localhost', path: '/' });

    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token:user.authentication.sessionToken
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const logout = (req: express.Request, res: express.Response) => {
  // Clear cookies on logout
  res.clearCookie('ANTONIO-AUTH', { domain: 'localhost', path: '/' });
  res.clearCookie('USERNAME', { domain: 'localhost', path: '/' });
  res.clearCookie('USERID', { domain: 'localhost', path: '/' });

  return res.sendStatus(200);
};

export const checkAuth = (req: express.Request, res: express.Response) => {
  // Assuming you have an authentication token stored in cookies
  const authToken = req.cookies['ANTONIO-AUTH'];

  if (authToken) {
    // User is authenticated, you might want to include more details in the response
    res.status(200).json({ message: 'Authenticated' });
  } else {
    // User is not authenticated
    res.status(401).json({ message: 'Not authenticated' });
  }
};