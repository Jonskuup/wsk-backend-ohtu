import {
  addCat,
  findCatById,
  findCatByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getAllCats = async (req, res) => {
  //const cats = [{cat_id: 1, name: 'Misu'}];
  console.log('Ollaan nyt controllerissa');
  // res.json(listAllCats());
  const cats = await listAllCats();

  // esimerkki siitä että middleware on muokannut req-objektia
  res.json({
    message: 'Tässä kissat',
    time: req.requestTime,
    data: cats,
  });
};

const getCatById = async (req, res) => {
  // 2. Haetaan kissa modelilta
  const cat = await findCatById(req.params.id);
  // 3. Jos kissaa ei löydy, palautetaan 404
  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt'});
  }
  // 4. Jos kissa löytyy, palautetaan sen tiedot
  res.json(cat);
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatByUserId(Number(req.params.id));

  res.json(cats);
};

const postCat = async (req, res) => {
  console.log('request', req.body);
  console.log(req.file);
  console.log(req.file.filename);
  req.body.filename = req.file.filename;
  req.body.owner = res.locals.user.user_id;

  const result = await addCat(req.body);
  if (result) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = async (req, res) => {
  const id = Number(req.params.id);
  const user = res.locals.user;
  console.log('user', user);

  const result = await removeCat(id, user);
  if (result) {
    res.json({message: 'Cat removed!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

const putCat = async (req, res) => {
  // in real life, all input data (req.body) should be validated before using it
  const user = res.locals.user;

  // Tavallinen käyttäjä ei voi vaihtaa kissan omistajaa
  if (user.role !== 'admin') {
    delete req.body.owner;
  }

  const result = await modifyCat(Number(req.params.id), req.body, user);

  if (result) res.json({message: 'Cat updated!'});
  else res.status(404).json({error: 404, message: 'Not found.'});
};

export {getAllCats, getCatById, getCatsByUserId, postCat, deleteCat, putCat};
