const itemModel = require("../models/itemModel");
const categoryModel = require("../models/categoryModel");

// GET /items
exports.listItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.render("items/index", { title: "Items", items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Internal Server Error");
  }
};

// GET /items/new
exports.newItemForm = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();

    res.render("items/form", {
      title: "New Item",
      action: "/items",
      item: null,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories for new item form:", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST /items
exports.createItem = async (req, res) => {
  const {
    category_id,
    name,
    brand,
    model,
    condition,
    quantity,
    unit,
    purchase_date,
    purchase_price,
    serial_number,
    location,
    notes,
  } = req.body;

  if (!category_id || !name) {
    return res.status(400).send("Category and name are required");
  }

  try {
    await itemModel.createItem({
      category_id: Number(category_id),
      name: name.trim(),
      brand: brand?.trim() || null,
      model: model?.trim() || null,
      condition,
      quantity: quantity ? Number(quantity) : 1,
      unit: unit?.trim() || "pcs",
      purchase_date: purchase_date || null,
      purchase_price: purchase_price ? Number(purchase_price) : null,
      serial_number: serial_number?.trim() || null,
      location: location?.trim() || null,
      notes: notes?.trim() || null,
    });

    res.redirect("/items");
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).send("Internal Server Error");
  }
};

// GET /items/:id
exports.showItem = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!Number.isInteger(itemId)) {
    return res.status(400).send("Invalid item id");
  }

  try {
    const item = await itemModel.getItemById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("items/show", {
      title: item.name,
      item,
    });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).send("Internal Server Error");
  }
};

// GET /items/:id/edit
exports.editItemForm = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!Number.isInteger(itemId)) {
    return res.status(400).send("Invalid item id");
  }

  try {
    const item = await itemModel.getItemById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    const categories = await categoryModel.getAllCategories();

    res.render("items/form", {
      title: "Edit Item",
      action: `/items/${itemId}/edit`,
      item,
      categories,
    });
  } catch (error) {
    console.error("Error fetching item for edit:", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST /items/:id/edit
exports.updateItem = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!Number.isInteger(itemId)) {
    return res.status(400).send("Invalid item id");
  }

  const {
    category_id,
    name,
    brand,
    model,
    condition,
    quantity,
    unit,
    purchase_date,
    purchase_price,
    serial_number,
    location,
    notes,
  } = req.body;

  if (!category_id || !name) {
    return res.status(400).send("Category and name are required");
  }

  try {
    const updated = await itemModel.updateItem(itemId, {
      category_id: Number(category_id),
      name: name.trim(),
      brand: brand?.trim() || null,
      model: model?.trim() || null,
      condition,
      quantity: quantity ? Number(quantity) : 1,
      unit: unit?.trim() || "pcs",
      purchase_date: purchase_date || null,
      purchase_price: purchase_price ? Number(purchase_price) : null,
      serial_number: serial_number?.trim() || null,
      location: location?.trim() || null,
      notes: notes?.trim() || null,
    });

    if (!updated) {
      return res.status(404).send("Item not found");
    }

    res.redirect(`/items/${itemId}`);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST /items/:id/delete
exports.deleteItem = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!Number.isInteger(itemId)) {
    return res.status(400).send("Invalid item id");
  }

  try {
    await itemModel.deleteItem(itemId);
    res.redirect("/items");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
};