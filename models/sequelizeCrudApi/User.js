
module.exports = (sequelize, DataTypes, Model) => {
    class User extends Model { }

    User.init({
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // Getter - get() function defined for one column in the model
            get() {
                const rawValue = this.getDataValue('firstName');
                return rawValue ? rawValue.toUpperCase() : null;
            }
        },
        lastName: {
            type: DataTypes.STRING,
            defaultValue: 'test',
            // allowNull defaults to true
            validate: {
                // isAlpha: {
                //     msg: 'Please enter only Alphabet'
                // },
                isLowercase: true,
            },
            set(value) {
                this.setDataValue('lastName', value + ' pk');
            },
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
                throw new Error('Do not try to set the `fullName` value!');
            }
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    });

    return User;
}

// Validations are checks performed in the Sequelize level, in pure JavaScript. If a validation fails, no SQL query will be sent to the database at all.

// constraints are rules defined at SQL level. If a constraint check fails, an error will be thrown by the database and Sequelize will forward this error to JavaScript