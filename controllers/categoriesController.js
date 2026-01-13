const categoryModel = require("../models/categoryModel");
const itemModel = require("../models/itemModel");

// GET /categories
exports.listCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.render("categories/index", { title: "Categories", categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Internal Server Error");
  }
};

// GET /categories/new
exports.newCategoryForm = (req, res) => {
  res.render("categories/form", {
    title: "New Category",
    action: "/categories",
    category: null,
  });
};

// POST /categories
exports.createCategory = async (req, res) => {
  const name = (req.body.name ?? "").trim();
  const description = (req.body.description ?? "").trim() || null;

  if (!name) {
    return res.status(400).send("Name is required");
  }

  try {
    await categoryModel.createCategory({ name, description });
    res.redirect("/categories");
  } catch (error) {
    // 23505 = unique_violation (category name must be unique)
    if (error?.code === "23505") {
      return res.status(400).send("Category name already exists");
    }

    console.error("Error creating category:", error);
    res.status(500).send("Internal Server Error");
  }
};

// GET /categories/:id
exports.showCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!Number.isInteger(categoryId)) {
    return res.status(400).send("Invalid category id");
  }

  try {
    const category = await categoryModel.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    // Items belong to the item model, not the category model
    const items = await itemModel.getItemsByCategoryId(categoryId);

    res.render("categories/show", {
      title: category.name,
      category,
      items,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send("Internal Server Error");
  }
};

// GET /categories/:id/edit
exports.editCategoryForm = async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!Number.isInteger(categoryId)) {
    return res.status(400).send("Invalid category id");
  }

  try {
    const category = await categoryModel.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("categories/form", {
      title: "Edit Category",
      action: `/categories/${categoryId}/edit`,
      category,
    });
  } catch (error) {
    console.error("Error fetching category for edit:", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST /categories/:id/edit
exports.updateCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!Number.isInteger(categoryId)) {
    return res.status(400).send("Invalid category id");
  }

  const name = (req.body.name ?? "").trim();
  const description = (req.body.description ?? "").trim() || null;

  if (!name) {
    return res.status(400).send("Name is required");
  }

  try {
    const updated = await categoryModel.updateCategory(categoryId, { name, description });
    if (!updated) {
      return res.status(404).send("Category not found");
    }
    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(400).send("Category name already exists");
    }

    console.error("Error updating category:", error);
    res.status(500).send("Internal Server Error");
  }
};

// POST /categories/:id/delete
exports.deleteCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!Number.isInteger(categoryId)) {
    return res.status(400).send("Invalid category id");
  }

  try {
    await categoryModel.deleteCategory(categoryId);
    res.redirect("/categories");
  } catch (error) {
    // 23503 = foreign_key_violation (category has items, ON DELETE RESTRICT)
    if (error?.code === "23503") {
      try {
        const category = await categoryModel.getCategoryById(categoryId);
        const items = await itemModel.getItemsByCategoryId(categoryId);
        return res.status(400).render("categories/show", {
          title: category?.name ?? "Category",
          category,
          items,
          error: "You can't delete this category while it still has items. Delete/move the items first.",
        });
      } catch (innerErr) {
        console.error("Error rendering category after delete failure:", innerErr);
      }

      return res.status(400).send(
        "You can't delete this category while it still has items. Delete/move the items first."
      );
    }

    console.error("Error deleting category:", error);
    res.status(500).send("Internal Server Error");
  }
};
