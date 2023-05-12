const express = require('express')
const app = express()
require('./db/index')
const router = require('./routes/index')
// const userController = require('./controllers/userController')


// tut1
// const User = require('./models/tut1/User')
// const UserClassModel = require('./models/tut1/UserClassModel')

// tut2
// const User = require('./models/tut2/User')
// const Contact = require('./models/tut2/Contact')

const bodyParser = require('body-parser')
const port = 8000 || process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.get('/adduser', userController.addUserByCreate)

//                                                           tut1

// User.sync({ force: true });
// UserClassModel.sync({ force: true });

/**
 *  // To drop the table related to a model:
 * await User.drop();
*/

/**
 * // This will run .sync() only if database name ends with '_test'
 * sequelize.sync({ force: true, match: /_test$/ });
*/

//                                                           tut2

// User.sync({ force: true });
// Contact.sync({ force: true });

// sequelize.sync({ force: true });

//                                                            sequelize crud api

app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Server Listen at ${port}`);
})