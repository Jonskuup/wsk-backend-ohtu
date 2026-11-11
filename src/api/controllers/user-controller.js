import {addUser, findUserById, listAllUsers} from '../models/user-model.js';

const getAllUsers = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({message: 'User not found.'});
  }

  res.json(user);
};

const postUser = (req, res) => {
  console.log('request', req.body);
  const id = addUser(req.body);

  res.status(201).json({user_id: id});
};

const deleteUser = (req, res) => {
  res.json({message: 'User item deleted.'});
};

const putUser = (req, res) => {
  res.json({message: 'User item updated.'});
};

export {getAllUsers, getUserById, postUser, deleteUser, putUser};
