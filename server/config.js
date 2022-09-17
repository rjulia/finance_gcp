const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  },
  listPerPage: 10,
};
module.exports = config;