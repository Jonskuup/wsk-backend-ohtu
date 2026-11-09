import promisePool from '../../utils/database.js';

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password)
               VALUES (?, ?, ?, ?)`;
  const params = [name, username, email, password];
  const [result] = await promisePool.execute(sql, params);

  console.log('insert query result', result);

  if (result.affectedRows === 0) {
    return false;
  }

  return {user_id: result.insertId};
};

const modifyUser = async (id, user) => {
  const {name, username, email} = user;

  const sql = `
    UPDATE wsk_users
    SET name = ?, username = ?, email = ?
    WHERE user_id = ?
  `;

  const params = [name, username, email, id];

  const [result] = await promisePool.execute(sql, params);

  return result.affectedRows > 0;
};

const deleteUser = async (id) => {
  // Aloitetaan tietokantatransaktio
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    // Poistetaan ensin käyttäjän kissat
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);

    // Poistetaan sitten käyttäjä
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    // Tallennetaan muutokset
    await connection.commit();

    if (result.affectedRows === 0) {
      return false;
    }

    return true;
  } catch (error) {
    // Jos tulee virhe, perutaan muutokset
    await connection.rollback();
    throw error;
  } finally {
    // Vapautetaan tietokantayhteys
    connection.release();
  }
};

export {findUserByUsername, addUser, deleteUser, modifyUser};
