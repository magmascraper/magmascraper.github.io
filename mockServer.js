const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());



app.use('/data', (req, res) => {

  const webs = [];
  webs.push({
    "name": "Medium",
    "url": "http://medium.com",
    "description": "Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.",
    "tags": [
      "rxjs",
      "angular"
    ]
  });
  webs.push({
    "name": "Real Python",
    "url": "http://realpython.com",
    "description": "Learn Python online: Python tutorials for developers of all skill levels, Python books and courses, Python news, code examples, articles, and more.",
    "tags": [
      "python",
      "django"      
    ]
  });
  webs.push({
    "name": "Dev Community",
    "url": "http://realpython.com",
    "description": "A constructive and inclusive social network for software developers. With you every step of your journey.",
    "tags": [
      "programming",
      "code"
    ]
  });
  webs.push({
    "name": "NRock",
    "url": "https://ngrok.com/docs",
    "description": "ngrok allows you to expose a web server running on your local machine to the internet. Just tell ngrok what port your web server is listening on.",
    "tags": [
      "network",
      "devops"
    ]
  });

  webs.push({
    "name": "NRock",
    "url": "https://ngrok.com/docs",
    "description": "ngrok allows you to expose a web server running on your local machine to the internet. Just tell ngrok what port your web server is listening on.",
    "tags": [
      "network",
      "devops"
    ]
  });

  

  webs.map(item => item.search=req.query.search);
  res.json(webs);
});

app.listen(9090, () => {
  console.log('running server');
})
