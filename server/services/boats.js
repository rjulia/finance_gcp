const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const crypto = require('crypto')

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM boats LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(boats) {
  const result = await db.query(
    `INSERT INTO boats (d, name, type, owner_id, date_made, rental_price) 
    VALUES (
      '${crypto.randomInt(860, 10000)}',
      '${boats.name}', 
      '${boats.type}', 
      ${boats.owner_id}, 
      '${boats.date_made}', 
      ${boats.rental_price}
    )`
  );

  let message = 'Error in creating Boats';

  if (result.affectedRows) {
    message = 'Boats created successfully';
  }

  return { message };
}

async function update(id, boats){
  const result = await db.query(
    `UPDATE boats 
    SET name='${boats.name}', type='${boats.type}', owner_id=${boats.owner_id}, 
    date_made='${boats.date_made}', rental_price=${boats.rental_price} 
    WHERE d=${id}` 
  );

  let message = 'Error in updating Boats';

  if (result.affectedRows) {
    message = 'Boats updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM boats WHERE d=${id}`
  );

  let message = 'Error in deleting Boats';

  if (result.affectedRows) {
    message = 'Boats deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  remove
}
