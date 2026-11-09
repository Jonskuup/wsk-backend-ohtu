import {addUser, deleteUser} from '../models/user-model.js';

const postUser = async (req, res) => {
  const result = await addUser(req.body);

  if (result) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const removeUser = async (req, res) => {
  const result = await deleteUser(Number(req.params.id));

  if (result) {
    res.json({message: 'User and cats removed!'});
  } else {
    res.status(404).json({message: 'User not found.'});
  }
};

export {postUser, removeUser};
