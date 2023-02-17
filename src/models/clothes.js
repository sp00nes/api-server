'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('clothes', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
