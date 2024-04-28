const { Model, DataTypes } = require('sequelize');
const { sequelize } = global;

class Reward extends Model {}

Reward.init({
    rewardid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    shopid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pointsrequired: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    validityid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Reward',
    tableName: 'rewards',
    timestamps: false, // set this to true if you have createdAt and updatedAt fields
});

Reward.associate = function(models) {
    this.belongsTo(models.Coffeeshops, {
        foreignKey: 'shopid',
    });
};
module.exports = Reward;