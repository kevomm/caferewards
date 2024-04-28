const { Model, DataTypes } = require('sequelize');
const { sequelize } = global;

class DigitalWallets extends Model {}

DigitalWallets.init({
    walletid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    carddetails: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    qrcode: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'DigitalWallets',
    tableName: 'digitalwallets',
    timestamps: false, // set this to true if you have createdAt and updatedAt fields
});

DigitalWallets.associate = function(models) {
    this.belongsTo(models.Users, { // Correction here
        foreignKey: 'userid',
    });
};

module.exports = DigitalWallets;