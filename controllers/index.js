const { Sequelize, Op, QueryTypes } = require('sequelize');
const db = require("../db");

const User = db.user;
const Contact = db.contact;
const addUserByBuild = async (req, res) => {
    const userRegister = User.build({ firstName: "Daniyal", lastName: 'Sheikh' });
    console.log(userRegister instanceof User); // true
    console.log(userRegister.firstName); // "userRegister"
    await userRegister.save();
    console.log('userRegister was saved to the database!');
    console.log(userRegister.toJSON()); // This is good!
    res.status(201).json(userRegister.toJSON())
}

const addUserByCreate = async (req, res) => {
    const userRegister = await User.create({ firstName: "daniyal", lastName: 'Sheikh' });
    console.log(userRegister instanceof User); // true
    console.log(userRegister.firstName); // "userRegister"
    console.log('userRegister was saved to the database!');
    console.log(userRegister.toJSON()); // This is good!
    res.status(201).json(userRegister.toJSON())
}

// .update() -> set() and save() dono krdeta hy
// .set() ky bd save() lrna hota hy

const addUsers = async (req, res) => {
    let data = req.body
    if (data.length > 1) {
        const users = await User.bulkCreate(data);
        res.status(201).json({ users })
    } else {
        const user = await User.create(data);
        res.status(201).json({ user })
    }
}
const addUser = async (req, res) => {
    let data = req.body
    const user = await User.create(data);
    res.json({ user })
}

const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json({ users })
}

const getUser = async (req, res) => {
    const users = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.json({ users })
}

const patchUser = async (req, res) => {
    let updatedData = req.body
    try {

        const users = await User.update(updatedData,
            {
                where: {
                    id: req.params.id
                }
            });
        res.json({ users })
    } catch (error) {
        res.json({ error })
        console.log(error);
    }
}

const deleteUser = async (req, res) => {
    const users = await User.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({ users })
}

const queryUser = async (req, res) => {
    /** ADD SPECIFIC COLOUMN VALUE */
    // const user = await User.create({
    //     firstName: 'alice123',
    // }, { fields: ['firstName'] });

    /** GET SPECIFIC COLOUMN VALUE */
    // const users = await User.findAll({
    //     attributes: ['firstName']
    // });

    /** CHANGE SPECIFIC COLOUMN KEY AND GET VALUE */
    // const users = await User.findAll({
    //     attributes: [
    //         ['firstName', 'first_Name']
    //     ]
    // });

    /** You can use sequelize.fn to do aggregations */
    // const users = await User.findAll({
    //     attributes: [
    //         [Sequelize.fn('COUNT', Sequelize.col('firstName')), 'n_firstName']
    //     ]
    // });

    /** INCLUDE AND EXCLUDE */
    // const users = await User.findAll({
    //     attributes: { exclude: ['lastName'] }
    // });

    // res.json({ users })

    /** WHERE WITH OP Op.in Op.and Op.or etc bhut sara methods hen sql ky */
    // const users = await User.findAll({
    //     where: {
    //         // id: {
    //         //     [Op.eq]: 4
    //         // }

    //         [Op.or]: [
    //             { id: 2 },
    //             { firstName: 'test' }
    //         ]
    //     },
    // });

    /** ORDER */
    // const users = await User.findAll({
    //     order: [
    //         ['id', 'DESC']
    //     ]
    // });

    /** GROUPING */
    const users = await User.findAll({
        group: 'lastName',
        limit: 2
    });

    res.json(users)
}

const finderQueryUser = async (req, res) => {

    /** findAll() */
    // const userData = await User.findAll({
    //     where: {
    //         firstName: 'test'
    //     }
    // });

    /** findOne() - return only first match element */
    // const userData = await User.findOne({
    //     where: {
    //         firstName: 'test'
    //     }
    // });

    /** findByPk() - return only match element */
    // const userData = await User.findByPk(4)

    /** findOrCreate() - if not in db first create and return, if found -> created:true || not found -> created:false */
    // const [userData, created] = await User.findOrCreate({
    //     where: { firstName: 'asad' },
    //     // defaults: {
    //     //     lastName: 'Technical'
    //     // }
    // });

    /** findAndCountAll() - returns an object with two properties: rows and count */
    const { count, rows } = await User.findAndCountAll({
        where: { firstName: 'test' },
    });

    res.json({ rows, count })
}

const getSetVirtualUser = async (req, res) => {
    /** Getter */
    // const users = await User.findAll({})

    /** Setter */
    // const users = await User.create({
    //     firstName: 'test',
    //     lastName: 'shiekh'
    // })

    /** Virtual */
    const users = await User.findAll({})
    res.json({ users })
}

const validateConstraintUser = async (req, res) => {

    /** Constraint - jb bh lgaenga to model(table) drop krenga phir use hoskega woh constraint  */
    try {
        const users = await User.create({
            firstName: 'test2',
            lastName: 'member1'
        })
        res.json({ users })
    } catch (error) {
        res.json(error.message)
    }
}

// Callee is the model definition. This allows you to easily map a query to a predefined model
const rawQueriesUser = async (req, res) => {

    /** model deka ap model ki getter setter sy set ki vi field mangwaskty jo database ka col ma save ni hoti */
    // const users = await db.sequelize.query("SELECT * FROM `users`", {
    //     type: QueryTypes.SELECT,
    //     model: User,
    //     mapToModel: true
    // });

    /** If an array is passed, ? will be replaced in the order that they appear in the array */
    // const users = await db.sequelize.query(
    //     'SELECT * FROM users WHERE firstName = ?',
    //     {
    //         replacements: ['test2'],
    //         type: QueryTypes.SELECT
    //     }
    // );

    /** If an object is passed, :key will be replaced with the keys from that object. If the object contains keys not found in the query or vice versa, an exception will be thrown. */
    // const users = await db.sequelize.query(
    //     'SELECT * FROM users WHERE id = :id',
    //     {
    //         replacements: { id: '1' },
    //         type: QueryTypes.SELECT
    //     }
    // );

    const users = await db.sequelize.query(
        'SELECT * FROM users WHERE id IN(:id)',
        {
            replacements: { id: ['1', '5'] },
            type: QueryTypes.SELECT
        }
    );
    res.json({ users })
}

const oneToOneUser = async (req, res) => {

    /** insert User and Contact Model Data */
    // const user = await User.create({
    //     firstName: 'test2',
    //     lastName: 'member',
    // })
    // if (user && user.id) {
    //     await Contact.create({
    //         permenant_address: "xyz2",
    //         current_address: "abc2",
    //         user_id: user.id,
    //     })
    // }
    // res.json({ user })

    /** get User and Contact Model Data */
    // const users = await User.findAll({
    //     include: Contact
    // })

    /** get User and Contact Model Data */
    const users = await User.findAll({
        attributes: ['firstName', 'lastName'],
        include: {
            model: Contact,
            attributes: ['permenant_address', 'current_address']
        }
    })

    res.json({ users })
}


const oneToManyUser = async (req, res) => {

    /** insert User and Contact Model Data */
    // const user = await Contact.create({
    //     permenant_address: "xyz1_2",
    //     current_address: "abc1_2",
    //     user_id: 1,
    // })

    /** get User and Contact Model Data */
    const users = await User.findAll({
        attributes: ['firstName', 'lastName'],
        include: {
            model: Contact,
            as: "ContactDetails",
            attributes: ['permenant_address', 'current_address']
        }
    })
    res.json({ users })
}

const manyToManyUser = async (req, res) => {
    /** insert User and Contact Model Data */
    // const user = await User.create({
    //     firstName: 'test2',
    //     lastName: 'member',
    // })
    // if (user && user.id) {
    //     await Contact.create({
    //         permenant_address: "xyz2",
    //         current_address: "abc2",
    //     })
    // }
    // res.json({ user })

    /** get User and Contact Model Data */
    const users = await User.findAll({
        attributes: ['firstName', 'lastName'],
        include: {
            model: Contact,
            attributes: ['permenant_address', 'current_address']
        }
    })
    res.json({ users })
}

module.exports = {
    addUserByBuild,
    addUserByCreate,
    addUsers,
    addUser,
    getUsers,
    getUser,
    patchUser,
    deleteUser,
    queryUser,
    finderQueryUser,
    getSetVirtualUser,
    validateConstraintUser,
    rawQueriesUser,
    oneToOneUser,
    oneToManyUser,
    manyToManyUser,
}