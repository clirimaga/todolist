const config = {
    db: {
      host: "db4free.net",
      user: 'clirim',
      password: "Clirim.1",
      database: "todolistclirim",
      connectTimeout: 60000
    },
    listPerPage: 10,
  };
  module.exports = config;

  // db: {
  //   host: "db4free.net",
  //   user: process.env.USER,
  //   password: process.env.PASSWORD,
  //   database: process.env.DATABASE,
  //   connectTimeout: 60000
  // },