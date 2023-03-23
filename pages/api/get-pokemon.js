const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql2');
const db = mysql.createConnection(process.env.DATABASE_URL);

app.use(cors());

console.log('Connected to PlanetScale!');

app.get('/', (req, res) => {
  db.query('SELECT * FROM `ptasks`', (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send('An error occurred while retrieving data');
    }
    res.send(results);
  });
});


app.listen(3000, () => {
  console.log('Yay, your server is running in port 3000');
});
