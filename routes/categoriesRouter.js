const { Router } = require('express');
const router = Router();
const categoriesController = require('../controllers/categoriesController');
const requireAdmin = require('../middleware/requireAdmin');

// List all categories
router.get('/', categoriesController.listCategories);

// Show form to create a new category
router.get('/new', categoriesController.newCategoryForm);

// Create a new category
router.post('/', categoriesController.createCategory);

// Show a specific category and its items
router.get('/:id', categoriesController.showCategory);

// Show form to edit a category
router.get('/:id/edit', categoriesController.editCategoryForm);

// Update a category
router.post('/:id/edit', requireAdmin, categoriesController.updateCategory);

// Delete a category
router.post('/:id/delete', requireAdmin, categoriesController.deleteCategory);

module.exports = router; 
