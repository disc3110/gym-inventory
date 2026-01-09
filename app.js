require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
// import routers
const indexRouter = require('./routes/indexRouter');

// Setup express app
app.set("view engine", "ejs"); // Using EJS as the templating engine
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Middleware to parse JSON bodies
app.use(express.json());

// Routers 
app.use('/', indexRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 