
var path = require('path')
const express = require('express')
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'views')});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});