-- WOOT courier integration columns
-- Run this in Supabase SQL Editor

ALTER TABLE orders ADD COLUMN IF NOT EXISTS woot_order_id TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS woot_awb TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS woot_courier TEXT;
