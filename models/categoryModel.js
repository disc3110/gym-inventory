// models/categoryModel.js
const pool = require("../db/pool");

/**
 * Get all categories
 */
async function getAllCategories() {
  const { rows } = await pool.query(
    `SELECT id, name, description, created_at
     FROM categories
     ORDER BY name ASC`
  );
  return rows;
}

/**
 * Get a single category by id
 */
async function getCategoryById(id) {
  const { rows } = await pool.query(
    `SELECT id, name, description, created_at
     FROM categories
     WHERE id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

/**
 * Create a new category
 */
async function createCategory({ name, description = null }) {
  const { rows } = await pool.query(
    `INSERT INTO categories (name, description)
     VALUES ($1, $2)
     RETURNING id, name, description, created_at`,
    [name, description]
  );
  return rows[0];
}

/**
 * Update category
 */
async function updateCategory(id, { name, description = null }) {
  const { rows } = await pool.query(
    `UPDATE categories
     SET name = $1,
         description = $2
     WHERE id = $3
     RETURNING id, name, description, created_at`,
    [name, description, id]
  );
  return rows[0] ?? null;
}

/**
 * Delete category
 * NOTE: will fail if items still reference it (ON DELETE RESTRICT)
 */
async function deleteCategory(id) {
  const result = await pool.query(
    `DELETE FROM categories
     WHERE id = $1`,
    [id]
  );
  return result.rowCount; // 1 if deleted, 0 if not found
}

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};