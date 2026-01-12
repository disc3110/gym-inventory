const itemModel = require("../models/itemModel");

exports.listItems = async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.render("items/list", { items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.newItemForm = async (req, res) => {
  try {
    const categories = await itemModel.getAllCategories();
    res.render("items/new", { categories });
  } catch (error) {
    console.error("Error fetching categories for new item form:", error);
    res.status(500).send("Internal Server Error");
  }
};

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
    location,
    notes,
  } = req.body;

  try {
    await itemModel.createItem({
      category_id,
      name,
      brand,
      model,
      condition,
      quantity,
      unit,
      purchase_date,
      purchase_price,
      location,
      notes,
    });
    res.redirect("/items");
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).send("Internal Server Error");
  }
};  

exports.showItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await itemModel.getItemById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.render("items/show", { item });
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.editItemForm = async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await itemModel.getItemById(itemId);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    const categories = await itemModel.getAllCategories();
    res.render("items/edit", { item, categories });
  } catch (error) {
    console.error("Error fetching item for edit:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateItem = async (req, res) => {
  const itemId = req.params.id;
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
    location,
    notes,
  } = req.body;

  try {
    await itemModel.updateItem(itemId, {
      category_id,
      name,
      brand,
      model,
      condition,
      quantity,
      unit,
      purchase_date,
      purchase_price,
      location,
      notes,
    });
    res.redirect(`/items/${itemId}`);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;
  try {
    await itemModel.deleteItem(itemId);
    res.redirect("/items");
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Internal Server Error");
  }
};  