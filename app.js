const express = require('express');

const app = express();

// To parse http request body on each request:
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

app.get('/', (req, res) => {
  res.send("HOMEPAGE!")
})






app.listen(3000, () => {
    console.log("Server running on port 3000")
  });