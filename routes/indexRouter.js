const { Router } = require('express');
const router = Router();

// Define a simple route for the home page
router.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

module.exports = router;    