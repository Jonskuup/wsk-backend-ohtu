import bcrypt from 'bcrypt';
import {addUser, deleteUser, modifyUser} from '../models/user-model.js';

const postUser = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addUser(req.body);

  if (result) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    const error = new Error('User could not be created.');
    error.status = 400;
    return next(error);
  }
};

const removeUser = async (req, res, next) => {
  // Haetaan kirjautuneen käyttäjän tiedot
  const loggedInUser = res.locals.user;
  const userId = Number(req.params.id);

  // Tavallinen käyttäjä saa poistaa vain itsensä.
  // Admin saa poistaa kenet tahansa.
  if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
    const error = new Error('Forbidden.');
    error.status = 403;
    return next(error);
  }

  const result = await deleteUser(userId);

  if (result) {
    res.json({message: 'User and cats removed!'});
  } else {
    const error = new Error('User not found.');
    error.status = 404;
    return next(error);
  }
};

const putUser = async (req, res, next) => {
  const loggedInUser = res.locals.user;
  const userId = Number(req.params.id);

  // Tavallinen käyttäjä saa muokata vain itseään.
  // Admin saa muokata ketä tahansa.
  if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
    const error = new Error('Forbidden.');
    error.status = 403;
    return next(error);
  }

  // Hashätään uusi salasana ennen tietokantaan tallentamista.
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const result = await modifyUser(userId, req.body);

  if (result) {
    res.json({message: 'User updated!'});
  } else {
    const error = new Error('User not found.');
    error.status = 404;
    return next(error);
  }
};

export {postUser, removeUser, putUser};
