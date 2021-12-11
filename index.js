const express = require('express');
const routes = require('./routes/routes');
const app = express();

require('dotenv').config({path: './config/.env'});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

// app.listen(3000);

// app.listen((process.env.PORT || 3000), function(){
// console.log('listening on *:3000');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});
