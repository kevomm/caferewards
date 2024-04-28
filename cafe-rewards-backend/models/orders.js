const { Model, DataTypes } = require('sequelize');
const { sequelize } = global;

class Order extends Model {}

Order.init({
    orderid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shopid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    orderdetails: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    totalamount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    orderstatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estimatedtime: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
});

Order.associate = function(models) {
    this.belongsTo(models.Users, {
        foreignKey: 'userid',
    });

    this.belongsTo(models.Coffeeshops, {
        foreignKey: 'shopid',
    });
}; // This closing bracket was missing

module.exports = Order;
