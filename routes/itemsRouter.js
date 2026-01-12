const { Router } = require('express');
const router = Router();
const itemsController = require('../controllers/itemsController');

// List all items
router.get('/', itemsController.listItems);

// Show form to create a new item
router.get('/new', itemsController.newItemForm);

// Create a new item
router.post('/new', itemsController.createItem);	

// Show a specific item
router.get('/:id', itemsController.showItem);

// Show form to edit an item
router.get('/:id/edit', itemsController.editItemForm);

// Update an item
router.post('/:id/edit', itemsController.updateItem);

// Delete an item
router.post('/:id/delete', itemsController.deleteItem);

module.exports = router;
