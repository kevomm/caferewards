const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Assuming your Sequelize configuration is in '../config/config'

const Menus = sequelize.define('Menus', {
    menuid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    shopid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'menu',
    timestamps: false,
});

Menus.associate = (models) => {
    this.belongsTo(models.Coffeeshops, {
        foreignKey: 'shopid',
    });
};

module.exports = Menus;