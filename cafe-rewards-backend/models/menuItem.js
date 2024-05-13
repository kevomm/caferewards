const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Assuming your Sequelize configuration is in '../config/config'


// Define MenuItem model next
const MenuItem = sequelize.define('MenuItem', {
    itemid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    menuid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'menu_items',
    timestamps: false,
});

MenuItem.associate = (models) => {
    console.log(models)
    this.belongsTo(models.Menus, {
        foreignKey: 'menuid',
    });
};

module.exports = MenuItem;
