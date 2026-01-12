const categoryModel = require("../models/categoryModel");

exports.listCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.render("categories/list", { categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.newCategoryForm = (req, res) => {
  res.render("categories/new");
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    await categoryModel.createCategory({ name, description });
    res.redirect("/categories");
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.showCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await categoryModel.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    const items = await categoryModel.getItemsByCategoryId(categoryId);
    res.render("categories/show", { category, items });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.editCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await categoryModel.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.render("categories/edit", { category });
  } catch (error) {
    console.error("Error fetching category for edit:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await categoryModel.deleteCategory(categoryId);
    res.redirect("/categories");
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).send("Internal Server Error");
  }
};      
    