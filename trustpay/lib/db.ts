// db.ts
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db: any = null

export async function getDb() {
  if (db) return db

  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      seller_id INTEGER NOT NULL,
      buyer_id INTEGER NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      refundable_amount DECIMAL(10, 2) NOT NULL,
      status TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (seller_id) REFERENCES users (id),
      FOREIGN KEY (buyer_id) REFERENCES users (id),
      CONSTRAINT check_amount CHECK (amount > 0),
      CONSTRAINT check_refundable_amount CHECK (refundable_amount >= 0 AND refundable_amount <= amount)
    );

    CREATE TABLE IF NOT EXISTS stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      unique_id TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS store_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      store_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      quantity INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (store_id) REFERENCES stores (id),
      CONSTRAINT check_price CHECK (price >= 0),
      CONSTRAINT check_quantity CHECK (quantity >= 0)
    );

    CREATE INDEX IF NOT EXISTS idx_transactions_seller_id ON transactions(seller_id);
    CREATE INDEX IF NOT EXISTS idx_transactions_buyer_id ON transactions(buyer_id);
    CREATE INDEX IF NOT EXISTS idx_stores_user_id ON stores(user_id);
    CREATE INDEX IF NOT EXISTS idx_store_items_store_id ON store_items(store_id);

    -- Trigger to update the updated_at timestamp for users
    CREATE TRIGGER IF NOT EXISTS update_user_timestamp
    AFTER UPDATE ON users
    FOR EACH ROW
    BEGIN
      UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
    END;

    -- Trigger to update the updated_at timestamp for stores
    CREATE TRIGGER IF NOT EXISTS update_store_timestamp
    AFTER UPDATE ON stores
    FOR EACH ROW
    BEGIN
      UPDATE stores SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
    END;

    -- Trigger to update the updated_at timestamp for store_items
    CREATE TRIGGER IF NOT EXISTS update_store_item_timestamp
    AFTER UPDATE ON store_items
    FOR EACH ROW
    BEGIN
      UPDATE store_items SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
    END;
  `)

  return db
}

export async function closeDb() {
  if (db) {
    await db.close()
    db = null
  }
}