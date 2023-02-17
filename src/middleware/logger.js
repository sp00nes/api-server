'use strict';

const logger = (req, res, next) => {
  console.log({path: req.path, method: req.method});
  next();
};

module.exports = logger;
