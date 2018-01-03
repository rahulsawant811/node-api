const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'This is GET route'
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    msg: 'This is POST route'
  });
});

module.exports = router;
