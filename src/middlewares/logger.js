// ns tyhmä oma middleware
// next() siirtää kkäsittelyn seuraavaan sopivaan middlewareen
// tai reitin käsittelijä

// Mitä tapahtuu jos next jää pois?

const logger = (req, res, next) => {
  console.log('middleware suoritettiin');
  next();
};

export default logger;
