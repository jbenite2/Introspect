import parse from 'url-parse';
import dotenv from 'dotenv'
dotenv.config()
import mysql from 'mysql2';
import http from 'http';


// Create a connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Print message if the connection is successful 
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database: ', error)
        return
    } else {
        console.log('Connected to the database!')
    }
})

// Request handler function that will manage multiple endpoints
const handler = (req, res) => {
    const { pathname  } = parse(req.url, true)
    if (pathname == '/display'){
        connection.query('SELECT * FROM `ptasks`', (err, results) => {
            if (err) {
                console.error('Error executing query:', err)
                res.writeHead(500)
                res.end()
                return
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(results))
        })
    } else if (pathname == '/add'){
        connection.query("INSERT INTO ptasks (name, time) VALUES ('testing again', '7');", (err, results) => {
            if (err) {
                console.error('Error executing query:', err)
                res.writeHead(500)
                res.end()
                return
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(results))
        })
    }
}

// Create a server and listen for incoming requests
const server = http.createServer(handler)
const port = process.env.PORT || 3000;
server.listen(port, (error) => {
  if (error) {
    console.error('Error starting server:', error);
    return;
  }
  console.log(`Server running on port ${port}`);
});

console.log('Connected to PlanetScale!')
connection.end()