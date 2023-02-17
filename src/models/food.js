'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('foods', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
