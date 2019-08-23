'use strict';
module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    'purchase',
    {
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  Purchase.createModel = buy => Purchase.findOrCreate({ where: buy, default: {} });

  return Purchase;
};
