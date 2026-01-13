const { Router } = require('express');
const router = Router();

// Define a simple route for the home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Gym Inventory Home' });
});

module.exports = router;    