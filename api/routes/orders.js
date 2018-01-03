const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'This is GET route'
  });
});

router.get('/:orderID', (req, res, next) => {
  let id = req.params.orderID;
  res.status(200).json({
    msg: 'The order id is '+ id
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    msg: 'This is POST route'
  });
});

module.exports = router;
