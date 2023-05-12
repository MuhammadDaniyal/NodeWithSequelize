const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('employeedb', 'root', '123456', {
    host: 'localhost',
    logging: false,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

sequelize.authenticate()
    .then(() => console.log('Database Connection has been successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error))

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('../models/sequelizeCrudApi/User')(sequelize, DataTypes, Model)
db.contact = require('../models/sequelizeCrudApi/Contact')(sequelize, DataTypes)
db.userContacts = require('../models/sequelizeCrudApi/userContacts')(sequelize, DataTypes, db.user, db.contact)

/** one-to-one */
// db.user.hasOne(db.contact, {
//     // by default foreign key bh chlejati hy 'userId' name sy agr specfic foreign key bhejni hoto aesy bhejta
//     foreignKey: 'user_id'
// });
// db.contact.belongsTo(db.user);

/** one-to-many */
// db.user.hasMany(db.contact, {
//     // by default foreign key bh chlejati hy 'userId' name sy agr specfic foreign key bhejni hoto aesy bhejta
//     foreignKey: 'user_id',
//     as: 'ContactDetails'
// });
// db.contact.belongsTo(db.user);

/** many-to-many */
db.user.belongsToMany(db.contact, { through: db.userContacts });
db.contact.belongsToMany(db.user, { through: db.userContacts });

db.sequelize.sync({ force: false });

module.exports = db