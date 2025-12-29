-- Create reference tables first (for 3NF normalization)

-- Currencies table
CREATE TABLE currencies (
    id SERIAL PRIMARY KEY,
    code VARCHAR(3) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    symbol VARCHAR(5) NOT NULL
);

CREATE UNIQUE INDEX currencies_code_key ON currencies USING btree (code);

-- Countries table
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(2) UNIQUE NOT NULL,
    currency_id INTEGER REFERENCES currencies(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX countries_code_key ON countries USING btree (code);

-- Wallet types table
CREATE TABLE wallet_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    display_name VARCHAR(100),
    icon VARCHAR(50),
    icon_color VARCHAR(7)
);

CREATE UNIQUE INDEX wallet_types_name_key ON wallet_types USING btree (name);

-- Transaction categories table
CREATE TABLE transaction_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
    description TEXT
);

-- Create main tables

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    dob DATE,
    country_id INTEGER REFERENCES countries(id) ON DELETE SET NULL,
    currency_id INTEGER REFERENCES currencies(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wallets table
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type_id INTEGER REFERENCES wallet_types(id) ON DELETE RESTRICT,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    color VARCHAR(7) DEFAULT '#000000',
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES transaction_categories(id) ON DELETE SET NULL,
    amount DECIMAL(15,2) NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')) NOT NULL,
    description TEXT,
    wallet_id INTEGER REFERENCES wallets(id) ON DELETE CASCADE,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Savings goals table
CREATE TABLE savings_goals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    goal_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    target_date DATE,
    savings_type VARCHAR(20) NOT NULL DEFAULT 'individual',
    linked_wallet_id INTEGER REFERENCES wallets(id) ON DELETE SET NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT savings_goals_savings_type_check CHECK (savings_type IN ('individual', 'linked'))
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_country_id ON users(country_id);
CREATE INDEX idx_users_currency_id ON users(currency_id);
CREATE INDEX idx_wallets_owner_id ON wallets(owner_id);
CREATE INDEX idx_wallets_type_id ON wallets(type_id);
CREATE INDEX idx_transactions_owner_id ON transactions(owner_id);
CREATE INDEX idx_transactions_wallet_id ON transactions(wallet_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_savings_goals_owner_id ON savings_goals(owner_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_savings_goals_updated_at BEFORE UPDATE ON savings_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
