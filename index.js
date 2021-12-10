const express = require('express');
const routes = require('./routes/routes');
require('dotenv').config({path: './config/.env'});
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(routes);
app.listen(3000);

// app.listen((process.env.PORT || 3000), function(){
//     console.log('listening on *:3000');
//   });