-- Clean existing data (safe order because of FK)
TRUNCATE TABLE items RESTART IDENTITY CASCADE;
TRUNCATE TABLE categories RESTART IDENTITY CASCADE;

-- Insert categories
INSERT INTO categories (name, description) VALUES
  ('Cardio', 'Machines focused on cardiovascular training'),
  ('Free Weights', 'Dumbbells, barbells, and plates'),
  ('Machines', 'Strength training machines'),
  ('Accessories', 'Smaller gym accessories and add-ons'),
  ('Recovery', 'Stretching and recovery equipment');

-- Insert items
INSERT INTO items (
  category_id,
  name,
  brand,
  model,
  condition,
  quantity,
  unit,
  location,
  notes
) VALUES
  -- Cardio
  (1, 'Treadmill', 'Life Fitness', 'T5', 'good', 2, 'pcs', 'Main floor', 'Regularly serviced'),
  (1, 'Stationary Bike', 'Peloton', 'Bike+', 'good', 1, 'pcs', 'Main floor', NULL),

  -- Free Weights
  (2, 'Adjustable Dumbbells', 'Bowflex', 'SelectTech 552', 'good', 1, 'pair', 'Free weight area', 'Max 52.5 lb'),
  (2, 'Olympic Barbell', 'Rogue', 'Ohio Bar', 'new', 2, 'pcs', 'Free weight area', '20kg standard bar'),
  (2, 'Bumper Plates Set', 'Rogue', 'HG 2.0', 'good', 3, 'sets', 'Plate storage', 'Includes 10–45 lb plates'),

  -- Machines
  (3, 'Leg Press Machine', 'Hammer Strength', NULL, 'good', 1, 'pcs', 'Machine zone', 'High demand machine'),
  (3, 'Lat Pulldown Machine', 'Cybex', NULL, 'worn', 1, 'pcs', 'Machine zone', 'Seat padding worn'),

  -- Accessories
  (4, 'Resistance Bands', 'Fit Simplify', NULL, 'good', 5, 'sets', 'Accessory rack', 'Light to heavy resistance'),
  (4, 'Kettlebells Set', 'CAP Barbell', NULL, 'good', 1, 'set', 'Free weight area', '5–50 lb'),

  -- Recovery
  (5, 'Foam Roller', 'TriggerPoint', 'GRID', 'good', 4, 'pcs', 'Stretching area', NULL),
  (5, 'Massage Gun', 'TheraGun', 'Prime', 'needs_repair', 1, 'pcs', 'Storage', 'Battery replacement needed');