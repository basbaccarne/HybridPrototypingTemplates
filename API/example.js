// This script starts a simple node.js express server
// It demonstrates how to receive events from Protopie and send commands back to Protopie
// To run this example:
// 1. Make sure you have Node.js installed
// 2. Save this code in a file named example.js
// 3. Run `npm install express` in the terminal to install the express package
// 4. Run `node example.js` to start the server
// 5. Follow the instructions in the comments to send events from Protopie and set commands

// Load the express module and create an app instance on port 3000
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming request bodies as text (you can also use express.json() for JSON data)
app.use(express.text({ type: '*/*' }));

// PART 1️⃣A: 
// Let the web server receive events from Protopie Connect (or from anywhere else) using HTTP POST requests
// In Protopie, go to API > Send API Request, and set it up like this:
// Method: POST
// URL: http://localhost:3000/pie-event (we define /pie-event as an endpoint to send data to in line 24)
// BODY: 1 (or any text you want to send as a test)
let latestPieEvent = 'no data yet'; // set the default
app.post('/pie-event', (req, res) => {
  console.log('POST request received on endpoint /pie-event - now set to:', req.body);
  latestPieEvent = req.body;
  res.send('well received');
});

// PART 1️⃣B: 
// Allow requests to get the latest data that was sent by ProtoPie Connect (or from anywhere else)
app.get('/pie-event', (req, res) => {
  res.send(latestPieEvent);
  console.log('GET request received on endpoint /pie-event. I replied with:', latestPieEvent);
});

// PART 2️⃣A:
// You can use a second end-point (/pie-command) to send data to Protopie Connect
// Allow requests to get the latest value of /pie-command (which Protopie can query)
let latestCommand = 'no data yet'; // set the default
app.get('/pie-command', (req, res) => {
  res.send(latestCommand);
  console.log('GET request received on endpoint /pie-command. I replied with:', latestCommand);
});

// PART 2️⃣B: 
// Allow HTTP POST commands to set the value of /pie command
app.post('/pie-command', (req, res) => {
  latestCommand = req.body;
  console.log('POST request received on endpoint /pie-command - now set to:', req.body);
  res.send('well received');
});

// test this using a tool like Postman or using curl in the terminal
// set the value using the following post request in Postman or using curl in the terminal or in Arduino :
// curl -X POST http://localhost:3000/pie-command -H "Content-Type: text/plain" -d "Hello from Thing I made"

// to get this data in Protopie Connect, set up a Get API Request in Protopie Connect with the following settings:
// Method: GET
// URL: http://localhost:3000/pie-command

// Finally: run the server:
app.listen(port, () => console.log(`--------------
🔥Let's rock!🔥 
This node.js server is up and running at http://localhost:${port}
(Check your ip using ipconfig in the console/terminal/powershell (or ifconfig on Mac))
--------------`));
