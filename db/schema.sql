-- Gym inventory schema (categories -> items relationship ONE TO MANY)

-- 1) Categories table
CREATE TABLE IF NOT EXISTS categories (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL UNIQUE,
  description  TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2) Items table
CREATE TABLE IF NOT EXISTS items (
  id             SERIAL PRIMARY KEY,

  category_id    INTEGER NOT NULL
                 REFERENCES categories(id)
                 ON UPDATE CASCADE
                 ON DELETE RESTRICT,

  name           TEXT NOT NULL,
  brand          TEXT,
  model          TEXT,

  condition      TEXT NOT NULL DEFAULT 'good'
                 CHECK (condition IN ('new', 'good', 'worn', 'needs_repair')),

  quantity       INTEGER NOT NULL DEFAULT 1
                 CHECK (quantity >= 0),

  unit           TEXT NOT NULL DEFAULT 'pcs',

  purchase_date  DATE,
  purchase_price NUMERIC(10,2)
                 CHECK (purchase_price IS NULL OR purchase_price >= 0),

  serial_number  TEXT UNIQUE,

  location       TEXT,
  notes          TEXT,

  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_items_category_id ON items(category_id);
CREATE INDEX IF NOT EXISTS idx_items_name ON items(name);

-- 3) Trigger to auto-update updated_at on UPDATE
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_items_updated_at ON items;

CREATE TRIGGER trg_items_updated_at
BEFORE UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();