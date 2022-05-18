const express = require('express');
var cors = require('cors')
const routes = require('./routes/routes');
const path = require('path');

//descobrir se estas duas vão no Index ou na Rota.
// const cloudinary = require('../cloudinary');
const fs = require('fs');

const app = express();

require('dotenv').config({path: './config/.env'});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

app.use('/files', express.static(path.resolve(__dirname,"public","upload")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
});

// app.listen(3000);

// app.listen((process.env.PORT || 3000), function(){
// console.log('listening on *:3000');
//   });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});
