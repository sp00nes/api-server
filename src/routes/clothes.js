'use strict';

const express = require('express');
const { clothesCollection } = require('../models');

const router = express.Router();

router.get('/clothes', async (req, res, next) => {
  const clothes = await clothesCollection.read();
  res.status(200).send(clothes);
});

router.get('/clothes/:id', async (req, res, next) => {
  const singleClothesItem = await clothesCollection.read(req.params.id);
  res.status(200).send(singleClothesItem);
});

router.post('/clothes', async (req, res, next) => {
  try {
    const newClothes = await clothesCollection.create(req.query);
    res.status(200).send(newClothes);
  } catch(e){
    next(e);
  }
});

router.put('/clothes/:id', async (req, res, next) =>{
  try{
    let item = await clothesCollection.update({name: req.query.name}, req.params.id);
    res.status(200).json(item[0]);
  }catch(e){
    next(e);
  }
});

router.delete('/clothes/:id', async (req, res, next) => {
  try {
    let item = await clothesCollection.delete(req.params.id);
    res.status(202).json(item[0]);
  } catch (e) {
    next(e);
  }
});



module.exports = router;
