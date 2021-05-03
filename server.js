const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
   express.static('/home/skuarch/Projects/magmascraper.github.io/dist')(req, res, next);
   // res.send('hey hello');
});

app.listen(8090, () => {
    console.log('running on port ', 8090);
});