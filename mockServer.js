const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());



app.use('/data', (req, res) => {

  const webs = [];
  webs.push({
    "url": "http://medium.com",
    "description": "website for developers",
    "tags": [
      "rxjs",
      "angular",
      "typescript"
    ]
  });
  webs.push({
    "url": "http://realpython.com",
    "description": "python turorials",
    "tags": [
      "python",
      "django",
      "pip"
    ]
  });

  webs.map(item => item.search=req.query.search);
  res.json(webs);
});

app.listen(9090, () => {
  console.log('running server');
})
