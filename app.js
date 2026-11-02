import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

//mock data
const cats = [
  {
    cat_id: 1,
    name: 'Misu',
    birthdate: '2020-01-01',
    weight: 4.5,
    owner: 'Jojo',
    image: 'https://placecats.com/320/240',
  },
  {
    cat_id: 2,
    name: 'Pörrö',
    birthdate: '2019-05-15',
    weight: 5.2,
    owner: 'Johanna',
    image: 'https://placecats.com/320/240',
  },
  {
    cat_id: 3,
    name: 'Kisu',
    birthdate: '2021-03-10',
    weight: 3.8,
    owner: 'Johanna',
    image: 'https://placecats.com/320/240',
  },
];

// app.use('/images', express.static('public'));
app.use(express.static('public'));

// käynistetään HTTP- palvelimen kuuntelemaan porttia 3000
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// express kutsuu reitin callback-funktiota
// request sisältää pyyntöä koskevat tiedot ja response vastaustoiminnot
app.get('/kissa', (req, res) => {
  res.send('Welcome to my REST API! moromoro');
});

app.get('/api/v1/cats/:id', (req, res) => {
  //const cats = [{cat_id: 1, name: 'Misu}];
  res.json(cats);
});

// GET http://localhost:3000/api/resource/99
// property name (id) is set in the route definition
app.get('/api/resource/cats/:id', (req, res) => {
  //console.log(req);

  // PALAUTTAKAA VAIN YKSI KISSA req.params.id haulla
  //1. Haetaan ID URL-parametrista ja muunnetaan numeroksi
  const id = Number(req.params.id);
  console.log(id);

  //2. Etsitään kissa mock-datasta
  // find palauttaa ensimmäisen löytyneen olion tai undefined
  const cat = cats.find((cat) => cat.cat_id === id);

  //3. Jos kissa ei löydy, palautetaan 404
  if (!cat) {
    return res.status(404).json({message: 'Kissaa ei löytynyt'});
  }

  //4. Jos kissa löytyy, palautetaan sen tiedot
  res.json(cat);
});

app.post('/api/v1/cats', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});
