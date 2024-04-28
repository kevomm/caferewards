const { Model, DataTypes } = require('sequelize');
const { sequelize } = global;

class Menus extends Model {}

Menus.init({
    menuid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    shopid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    itemname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemprice: {
        type: DataTypes.DECIMAL(10,2), // Use decimal type for precise calculation
        allowNull: false
    },
    itemdescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Menus',
    tableName: 'menu',
    timestamps: false, // set this to true if you have createdAt and updatedAt fields
});

Menus.associate = function(models) {
    this.belongsTo(models.Coffeeshops, {
        foreignKey: 'shopid',
    });
};
module.exports = Menus;