const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/', (req, res, next) => {
    Order.find()
         .exec()
         .then(docs => {
             const response = {
               count: docs.length,
               products: docs.map(doc => {
                 return {
                   quantity: doc.quantity,
                   product: doc.product,
                   _id: doc._id,
                   request: {
                     type: 'GET',
                     url: 'http://localhost:5000/orders/' + doc._id
                   }
                 }
               })
             }
             res.status(200).json(response)
         })
         .catch(err => {
             res.status(500).json({
                 error: err
             });
         });

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
  const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.product
  });

  order.save()
       .then(result => {
           console.log(result);
           res.status(201).json({
               msg: "Order created successfully",
               created: {
                   product: result.product,
                   quantity: result.quantity,
                   _id: result._id,
                   request: {
                       type: 'GET',
                       url: 'http://localhost:5000/orders/'+ result._id
                   }
               }
           })
       })
       .catch(err => {
           console.log(err);
           res.status(500).json({
               error: err
           })
       });

});

module.exports = router;
