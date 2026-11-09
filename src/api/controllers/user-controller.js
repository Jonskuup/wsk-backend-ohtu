import bcrypt from 'bcrypt';
import {addUser, deleteUser, modifyUser} from '../models/user-model.js';

const postUser = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const result = await addUser(req.body);

  if (result) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const removeUser = async (req, res) => {
  // Haetaan kirjautuneen käyttäjän tiedot
  const loggedInUser = res.locals.user;
  const userId = Number(req.params.id);

  // Tavallinen käyttäjä saa poistaa vain itsensä.
  // Admin saa poistaa kenet tahansa.
  if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
    return res.status(403).json({message: 'Forbidden.'});
  }

  const result = await deleteUser(userId);

  if (result) {
    res.json({message: 'User and cats removed!'});
  } else {
    res.status(404).json({message: 'User not found.'});
  }
};

const putUser = async (req, res) => {
  const loggedInUser = res.locals.user;
  const userId = Number(req.params.id);

  // Tavallinen käyttäjä saa muokata vain itseään.
  // Admin saa muokata ketä tahansa.
  if (loggedInUser.role !== 'admin' && loggedInUser.user_id !== userId) {
    return res.status(403).json({message: 'Forbidden.'});
  }

  const result = await modifyUser(userId, req.body);

  if (result) {
    res.json({message: 'User updated!'});
  } else {
    res.status(404).json({message: 'User not found.'});
  }
};

export {postUser, removeUser, putUser};
