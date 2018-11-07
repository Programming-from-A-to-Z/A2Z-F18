console.log('starting');

const fs = require('fs');
const express = require('express');
const cors = require('cors');

const data = fs.readFileSync('birds.json');
const birds = JSON.parse(data);

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

app.get('/birds/:type/', (request, response) => {
  console.log(request.params);

  let type = request.params['type'];

  for (let i = 0; i < birds.birds.length; i++) {
    let family = birds.birds[i];
    let members = birds.birds[i].members;
    for (let j = 0; j < members.length; j++) {
      if (members[j] === type) {
        response.send({
          status: 'success',
          type: type
        })
      }
    }
  }

  response.send({
    status: 'error not found',
  })
})