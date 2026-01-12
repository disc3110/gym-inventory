// models/itemModel.js
const pool = require("../db/pool");

/**
 * Get all items
 */
async function getAllItems() {
  const { rows } = await pool.query(
    `SELECT
        i.*,
        c.name AS category_name
     FROM items i
     JOIN categories c ON c.id = i.category_id
     ORDER BY i.name ASC`
  );
  return rows;
}

/**
 * Get an item by id (includes category name)
 */
async function getItemById(id) {
  const { rows } = await pool.query(
    `SELECT
        i.*,
        c.name AS category_name
     FROM items i
     JOIN categories c ON c.id = i.category_id
     WHERE i.id = $1`,
    [id]
  );
  return rows[0] ?? null;
}

/**
 * Get all items for one category (category page)
 */
async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    `SELECT *
     FROM items
     WHERE category_id = $1
     ORDER BY name ASC`,
    [categoryId]
  );
  return rows;
}

/**
 * Create item
 */
async function createItem({
  category_id,
  name,
  brand = null,
  model = null,
  condition = "good",
  quantity = 1,
  unit = "pcs",
  purchase_date = null,
  purchase_price = null,
  serial_number = null,
  location = null,
  notes = null,
}) {
  const { rows } = await pool.query(
    `INSERT INTO items (
        category_id, name, brand, model, condition, quantity, unit,
        purchase_date, purchase_price, serial_number, location, notes
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING *`,
    [
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
    ]
  );
  return rows[0];
}

/**
 * Update item
 */
async function updateItem(id, fields) {
  // Whitelist allowed fields so nobody updates random columns
  const allowed = new Set([
    "category_id",
    "name",
    "brand",
    "model",
    "condition",
    "quantity",
    "unit",
    "purchase_date",
    "purchase_price",
    "serial_number",
    "location",
    "notes",
  ]);

  const keys = Object.keys(fields).filter((k) => allowed.has(k));
  if (keys.length === 0) return null;

  // Build: SET col1=$1, col2=$2 ...
  const setClause = keys.map((k, idx) => `${k} = $${idx + 1}`).join(", ");
  const values = keys.map((k) => fields[k]);

  const { rows } = await pool.query(
    `UPDATE items
     SET ${setClause}
     WHERE id = $${keys.length + 1}
     RETURNING *`,
    [...values, id]
  );

  return rows[0] ?? null;
}

/**
 * Delete item
 */
async function deleteItem(id) {
  const result = await pool.query(`DELETE FROM items WHERE id = $1`, [id]);
  return result.rowCount;
}

/**
 * Search items by name (case-insensitive)
 */
async function searchItemsByName(query) {
  const { rows } = await pool.query(
    `SELECT i.*, c.name AS category_name
     FROM items i
     JOIN categories c ON c.id = i.category_id
     WHERE i.name ILIKE $1
     ORDER BY i.name ASC`,
    [`%${query}%`]
  );
  return rows;
}

module.exports = {
  getAllItems,
  getItemById,
  getItemsByCategoryId,
  createItem,
  updateItem,
  deleteItem,
  searchItemsByName,
};