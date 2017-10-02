const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.listen(3000, () => console.log(`Express listening on port 3000`));