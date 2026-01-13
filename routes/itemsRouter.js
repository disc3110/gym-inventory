const express = require("express");
const router = express.Router();

const itemsController = require("../controllers/itemsController");

// GET /items
router.get("/", itemsController.listItems);

// GET /items/new
router.get("/new", itemsController.newItemForm);

// POST /items
router.post("/", itemsController.createItem);

// GET /items/:id
router.get("/:id", itemsController.showItem);

// GET /items/:id/edit
router.get("/:id/edit", itemsController.editItemForm);

// POST /items/:id/edit
router.post("/:id/edit", itemsController.updateItem);

// POST /items/:id/delete
router.post("/:id/delete", itemsController.deleteItem);

module.exports = router;
