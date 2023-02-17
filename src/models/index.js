'use strict';

require('dotenv').config();
const { Sequelize, DataTypes} = require('sequelize');
const clothes = require('./clothes');
const food = require('./food');
const Collection = require('./collection');

// if sqlite::memory does not work, use sqlite:memory
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;
// db singleton
const sequelizeDatabase = new Sequelize(DATABASE_URL);
const clothesModel = clothes(sequelizeDatabase, DataTypes);
const foodModel = food(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  clothesCollection: new Collection(clothesModel),
  foodCollection: new Collection(foodModel),
};
