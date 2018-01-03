const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'This is GET route'
  });
});

router.post('/', (req, res) => {
  const product = {
      name: req.body.name,
      price: req.body.price
  };

  res.status(201).json({
    msg: 'This is POST route',
    created: product
  });
});

module.exports = router;
