const { Model, DataTypes } = require('sequelize');
const { sequelize } = global;
const bcrypt = require('bcryptjs');

class Owner extends Model {}

Owner.init({
    // The field is `ownerid` according to your DB schema, not `ownerId`.
    ownerid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactinfo: {  // I changed 'email' to 'contactinfo' to match your DB schema.
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Owner',
    tableName: 'owners', // Make sure the table name is in lowercase to match the DB schema.
    timestamps: false,
    hooks: {
        beforeCreate: async (owner) => {
            if (owner.password) { // Make sure 'password' field exists if you're going to hash it
                const salt = await bcrypt.genSalt(10);
                owner.password = await bcrypt.hash(owner.password, salt);
            }
        },
        beforeUpdate: async (owner) => {
            if (owner.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                owner.password = await bcrypt.hash(owner.password, salt);
            }
        },
    }
});

module.exports = Owner;