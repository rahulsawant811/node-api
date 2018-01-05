const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
//mongodb+srv://node-shop:<PASSWORD>@node-rest-app-g46y1.mongodb.net/test
mongoose.connect('mongodb://node-shop:'+ process.env.MONGO_ATLAS_PWD +'@node-rest-app-shard-00-00-g46y1.mongodb.net:27017,node-rest-app-shard-00-01-g46y1.mongodb.net:27017,node-rest-app-shard-00-02-g46y1.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-app-shard-0&authSource=admin'
//,{useMongoClient: true}
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);



app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message
    }
  });
});

app.listen(port, () => {
  console.log('Listening on port '+ port);
});
