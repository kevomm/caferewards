const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Assuming your Sequelize configuration is in '../config/config'

const Coffeeshops = sequelize.define('Coffeeshops', {
    shopid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ownerid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stripeid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'coffeeshops',
    timestamps: false, // set this to true if you have createdAt and updatedAt fields
});

Coffeeshops.associate = (models) => {
    this.hasMany(models.Menus, {
        foreignKey: 'shopid',
    });

    this.hasMany(models.Orders, {
        foreignKey: 'shopid',
    });

    this.hasMany(models.Rewards, {
        foreignKey: 'shopid',
    });

    this.hasMany(models.Transactions, {
        foreignKey: 'shopid',
    });

    this.belongsTo(models.Owners, {
        foreignKey: 'ownerid',
    });
};

module.exports = Coffeeshops;
