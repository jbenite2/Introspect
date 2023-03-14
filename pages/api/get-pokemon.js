require('dotenv').config()
const express = require('express') //Instance of the express library
const app = express() //Creating an app from the instance
const mysql = require('mysql2')
const db = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

db.query('SELECT * FROM `ptasks`', (err, results) => {
    console.log(results)
})

db.end()

app.listen(3000, () => {
    console.log('Yay, your server is running in port 3000')
  })
