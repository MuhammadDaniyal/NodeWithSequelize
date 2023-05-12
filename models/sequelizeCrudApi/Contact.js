
module.exports = (sequelize, DataTypes) => {

    const Contact = sequelize.define('Contacts', {
        // Model attributes are defined here
        permenant_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        current_address: {
            type: DataTypes.STRING,
        },
        /** for one-to-one & one-to-many  */
        // user_id: DataTypes.INTEGER
    });

    return Contact;
}