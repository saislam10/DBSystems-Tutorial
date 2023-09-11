const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('react_app_db', 'appuser', 'Weekends121002!+', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.sync().then(() => {
  console.log('Tables have been synchronized');
}).catch(error => {
  console.error('Unable to sync the tables:', error);
});


// sequelize.authenticate()
//   .then(() => console.log('Database connection has been established successfully.'))
//   .catch(error => console.error('Unable to connect to the database:', error));
const User = require('./user')(sequelize);

module.exports = {
    sequelize,
    User
};


