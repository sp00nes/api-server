'use strict';

const express = require('express');
const { foodCollection } = require('../models');

const router = express.Router();

router.get('/food', async (req, res, next) => {
  const food = await foodCollection.read();
  res.status(200).send(food);
});

router.get('/food/:id', async (req, res, next) => {
  const singleFoodItem = await foodCollection.read(req.params.id);
  res.status(200).send(singleFoodItem);
});

router.post('/food', async (req, res, next) => {
  try {
    const newFood = await foodCollection.create(req.query);
    res.status(200).send(newFood);
  } catch(e){
    next(e);
  }
});

router.put('/food/:id', async (req, res, next) =>{
  try{
    let item = await foodCollection.update({name: req.query.name}, req.params.id);
    res.status(200).send(item);
  }catch(e){
    next(e);
  }
});

router.delete('/food/:id', async (req, res, next) => {
  try {
    let item = await foodCollection.delete(req.params.id);
    res.status(202).json(item);
  } catch (e) {
    next(e);
  }
});



module.exports = router;
