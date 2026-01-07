-- Seed data for reference tables

-- Currencies table seed data
INSERT INTO currencies (code, name, symbol) VALUES
('USD', 'US Dollar', '$'),
('EUR', 'Euro', '€'),
('GBP', 'British Pound', '£'),
('INR', 'Indian Rupee', '₹'),
('JPY', 'Japanese Yen', '¥'),
('CAD', 'Canadian Dollar', 'C$'),
('AUD', 'Australian Dollar', 'A$'),
('AED', 'UAE Dirham', 'د.إ'),
('SGD', 'Singapore Dollar', 'S$'),
('CHF', 'Swiss Franc', 'CHF'),
('SEK', 'Swedish Krona', 'kr'),
('NOK', 'Norwegian Krone', 'kr'),
('DKK', 'Danish Krone', 'kr'),
('BRL', 'Brazilian Real', 'R$'),
('MXN', 'Mexican Peso', '$'),
('ZAR', 'South African Rand', 'R');

-- Countries table seed data
INSERT INTO countries (name, code, currency_id) VALUES
('United States', 'US', 1),
('United Kingdom', 'GB', 2),
('Canada', 'CA', 6),
('Australia', 'AU', 7),
('Germany', 'DE', 2),
('France', 'FR', 2),
('India', 'IN', 4),
('Japan', 'JP', 5),
('United Arab Emirates', 'AE', 8),
('Singapore', 'SG', 9),
('Switzerland', 'CH', 10),
('Sweden', 'SE', 11),
('Norway', 'NO', 12),
('Denmark', 'DK', 13),
('Netherlands', 'NL', 2),
('Spain', 'ES', 2),
('Italy', 'IT', 2),
('Brazil', 'BR', 14),
('Mexico', 'MX', 15),
('South Africa', 'ZA', 16);

-- Wallet types table seed data
INSERT INTO wallet_types (name, description, display_name, icon, icon_color) VALUES
-- Core / Generic Wallets
('wallet', 'General purpose wallet', 'Wallet', 'Wallet', '#22c55e'),
('wallet_cards', 'Wallet with multiple cards', 'Wallet Cards', 'Wallet', '#3b82f6'),
('credit_card', 'Credit card account', 'Credit Card', 'CreditCard', '#3b82f6'),
('bank_account', 'Traditional bank account', 'Bank Account', 'Landmark', '#6b7280'),
('savings', 'Savings account', 'Savings', 'PiggyBank', '#10b981'),
('coins', 'Physical coins', 'Coins', 'Coins', '#eab308'),
('hand_coins', 'Physical cash money', 'Cash', 'HandCoins', '#22c55e'),
('banknote', 'Paper currency', 'Banknote', 'Banknote', '#f59e0b'),

-- Cash & Currency-Specific Wallets
('circle_dollar_sign', 'US Dollar wallet', 'Dollar', 'CircleDollarSign', '#22c55e'),
('badge_dollar_sign', 'General currency wallet', 'Currency', 'BadgeDollarSign', '#eab308'),
('dollar_sign', 'US Dollar', 'USD', 'DollarSign', '#22c55e'),
('euro', 'Euro currency', 'Euro', 'Euro', '#6366f1'),
('pound_sterling', 'British Pound', 'Pound', 'PoundSterling', '#f43f5e'),
('japanese_yen', 'Japanese Yen', 'Yen', 'JapaneseYen', '#ef4444'),
('indian_rupee', 'Indian Rupee', 'Rupee', 'IndianRupee', '#10b981'),
('bitcoin', 'Bitcoin wallet', 'Bitcoin', 'Bitcoin', '#f97316'),

-- Crypto & Web3 Wallet Types
('private_key', 'Private key / seed phrase', 'Private Key', 'Key', '#8b5cf6'),
('qr_code', 'Address-based wallet', 'QR Code', 'QrCode', '#3b82f6'),
('multi_chain', 'Multi-chain wallet', 'Multi-Chain', 'Layers', '#06b6d4'),
('on_chain', 'Decentralized wallet', 'On-Chain', 'Globe', '#0ea5e9'),
('secure_wallet', 'Audited wallet', 'Secure', 'ShieldCheck', '#22c55e'),

-- Hot Wallets (Connected / Software-Based)
('smartphone', 'Mobile wallet', 'Mobile', 'Smartphone', '#3b82f6'),
('laptop', 'Desktop wallet', 'Desktop', 'Laptop', '#6b7280'),
('tablet', 'Tablet wallet', 'Tablet', 'Tablet', '#6366f1'),
('cloud', 'Cloud-based wallet', 'Cloud', 'Cloud', '#0ea5e9'),
('wifi', 'Connected wallet', 'Connected', 'Wifi', '#22c55e'),
('plug', 'Always connected', 'Plugged In', 'Plug', '#eab308'),
('database', 'Database wallet', 'Database', 'Database', '#8b5cf6'),

-- Cold Wallets (Offline / Hardware)
('usb', 'USB wallet', 'USB', 'Usb', '#3b82f6'),
('hard_drive', 'Hard drive wallet', 'Hard Drive', 'HardDrive', '#6b7280'),
('server', 'Server wallet', 'Server', 'Server', '#6366f1'),
('archive', 'Archived wallet', 'Archive', 'Archive', '#f59e0b'),
('box', 'Physical box', 'Box', 'Box', '#92400e'),
('boxes', 'Multiple boxes', 'Boxes', 'Boxes', '#92400e'),
('folder_lock', 'Locked folder', 'Locked Folder', 'FolderLock', '#ef4444'),
('file_lock', 'Locked file', 'Locked File', 'FileLock', '#ef4444'),

-- Custodial vs Non-Custodial
('custodial', 'Custodial wallet', 'Custodial', 'Users', '#3b82f6'),
('building', 'Institutional wallet', 'Building', 'Building', '#6b7280'),
('users', 'Multi-user wallet', 'Users', 'Users', '#3b82f6'),
('briefcase', 'Business wallet', 'Briefcase', 'Briefcase', '#92400e'),
('non_custodial', 'Self-custodial wallet', 'Non-Custodial', 'User', '#22c55e'),
('lock', 'Locked wallet', 'Lock', 'Lock', '#ef4444'),
('shield', 'Protected wallet', 'Shield', 'Shield', '#22c55e'),

-- Security & Privacy Focused Wallets
('eye_off', 'Hidden wallet', 'Hidden', 'EyeOff', '#6b7280'),
('fingerprint', 'Biometric wallet', 'Fingerprint', 'Fingerprint', '#3b82f6'),
('scan_face', 'Face recognition', 'Face Scan', 'ScanFace', '#8b5cf6'),

-- Payment & Spending Wallets
('receipt', 'Receipt wallet', 'Receipt', 'Receipt', '#22c55e'),
('receipt_text', 'Detailed receipt', 'Receipt Text', 'ReceiptText', '#3b82f6'),
('shopping_cart', 'Shopping wallet', 'Shopping', 'ShoppingCart', '#ef4444'),
('nfc', 'NFC payments', 'NFC', 'Nfc', '#8b5cf6'),
('arrow_left_right', 'Transfer wallet', 'Transfer', 'ArrowLeftRight', '#06b6d4'),

-- Access / Authentication-Based Wallets
('key_round', 'Round key', 'Key Round', 'KeyRound', '#eab308'),
('lock_keyhole', 'Keyhole lock', 'Lock Keyhole', 'LockKeyhole', '#ef4444'),
('unlock', 'Unlocked wallet', 'Unlock', 'Unlock', '#22c55e'),
('scan', 'Scan auth', 'Scan', 'Scan', '#8b5cf6'),
('scan_line', 'Line scanner', 'Scan Line', 'ScanLine', '#3b82f6'),
('id_card', 'ID authentication', 'ID Card', 'IdCard', '#22c55e'),
('badge_check', 'Verified badge', 'Badge Check', 'BadgeCheck', '#22c55e'),

-- Multi-Sig / Shared / DAO Wallets
('users_round', 'Round users', 'Users Round', 'UsersRound', '#3b82f6'),
('user_plus', 'Add user', 'User Plus', 'UserPlus', '#22c55e'),
('network', 'Network wallet', 'Network', 'Network', '#06b6d4'),
('share_2', 'Shared wallet', 'Share', 'Share2', '#8b5cf6'),
('git_merge', 'Merged wallet', 'Merge', 'GitMerge', '#f97316'),
('workflow', 'Workflow wallet', 'Workflow', 'Workflow', '#3b82f6'),
('split', 'Split wallet', 'Split', 'Split', '#ef4444'),

-- Time-Locked / Vault-Like Wallets
('clock', 'Time-based wallet', 'Clock', 'Clock', '#3b82f6'),
('timer', 'Timed wallet', 'Timer', 'Timer', '#ef4444'),
('vault', 'Secure vault', 'Vault', 'Vault', '#6b7280'),
('archive_restore', 'Restored archive', 'Archive Restore', 'ArchiveRestore', '#f59e0b'),
('calendar_clock', 'Scheduled wallet', 'Calendar Clock', 'CalendarClock', '#10b981'),
('history', 'Historical wallet', 'History', 'History', '#6b7280'),

-- Backup / Recovery Wallets
('copy', 'Copied wallet', 'Copy', 'Copy', '#3b82f6'),
('clipboard', 'Clipboard wallet', 'Clipboard', 'Clipboard', '#6b7280'),
('clipboard_check', 'Checked clipboard', 'Clipboard Check', 'ClipboardCheck', '#22c55e'),
('download', 'Downloaded wallet', 'Download', 'Download', '#3b82f6'),
('upload', 'Uploaded wallet', 'Upload', 'Upload', '#22c55e'),
('rotate_ccw', 'Rotated wallet', 'Rotate CCW', 'RotateCcw', '#8b5cf6'),
('refresh_ccw', 'Refreshed wallet', 'Refresh CCW', 'RefreshCcw', '#06b6d4'),

-- Spending-Control / Budget Wallets
('sliders_horizontal', 'Adjustable wallet', 'Sliders', 'SlidersHorizontal', '#3b82f6'),
('gauge', 'Gauge wallet', 'Gauge', 'Gauge', '#22c55e'),
('scale', 'Balanced wallet', 'Scale', 'Scale', '#6b7280'),
('trending_up', 'Growing wallet', 'Trending Up', 'TrendingUp', '#22c55e'),
('trending_down', 'Declining wallet', 'Trending Down', 'TrendingDown', '#ef4444'),
('percent', 'Percentage wallet', 'Percent', 'Percent', '#f59e0b'),

-- Merchant / Business Wallets
('store', 'Store wallet', 'Store', 'Store', '#3b82f6'),
('shopping_bag', 'Shopping wallet', 'Shopping Bag', 'ShoppingBag', '#ef4444'),
('briefcase_business', 'Business wallet', 'Business', 'BriefcaseBusiness', '#6b7280'),
('building_2', 'Building wallet', 'Building 2', 'Building2', '#6b7280'),
('barcode', 'Barcode wallet', 'Barcode', 'Barcode', '#0f172a'),

-- Privacy / Stealth Wallets
('ghost', 'Ghost wallet', 'Ghost', 'Ghost', '#ffffff'),
('shield_alert', 'Alerted wallet', 'Shield Alert', 'ShieldAlert', '#ef4444'),

-- Experimental / Advanced Wallets
('code', 'Code wallet', 'Code', 'Code', '#8b5cf6'),
('terminal', 'Terminal wallet', 'Terminal', 'Terminal', '#22c55e'),
('cpu', 'CPU wallet', 'CPU', 'Cpu', '#3b82f6'),
('braces', 'Braces wallet', 'Braces', 'Braces', '#8b5cf6'),
('function_square', 'Function wallet', 'Function', 'FunctionSquare', '#06b6d4'),
('bot', 'Bot wallet', 'Bot', 'Bot', '#22c55e'),

-- Visual Variants / UI Differentiators
('folder', 'Folder wallet', 'Folder', 'Folder', '#f59e0b'),
('folder_open', 'Open folder', 'Folder Open', 'FolderOpen', '#f59e0b'),
('layers_3', 'Layered wallet', 'Layers 3', 'Layers3', '#06b6d4'),

-- Legacy types for backward compatibility
('digital_wallet', 'Digital payment wallet', 'Digital Wallet', 'Smartphone', '#8b5cf6'),
('investment', 'Investment account', 'Investment', 'ChartLine', '#ef4444'),
('loan', 'Loan account', 'Loan', 'HandCoins', '#f97316'),
('other', 'Other type of wallet', 'Other', 'Wallet', '#6b7280');

-- Transaction categories table seed data
-- Income categories
INSERT INTO transaction_categories (name, type, description) VALUES
('Salary', 'income', 'Regular employment salary'),
('Freelance', 'income', 'Freelance work income'),
('Investment', 'income', 'Investment returns'),
('Gift', 'income', 'Gifts received'),
('Refund', 'income', 'Refunds and rebates'),
('Bonus', 'income', 'Work bonuses'),
('Dividend', 'income', 'Stock dividends'),
('Rental', 'income', 'Rental income');

-- Expense categories
INSERT INTO transaction_categories (name, type, description) VALUES
('Food & Dining', 'expense', 'Groceries, restaurants, cafes'),
('Transportation', 'expense', 'Fuel, public transport, taxis'),
('Housing', 'expense', 'Rent, mortgage, utilities'),
('Utilities', 'expense', 'Electricity, water, gas, internet'),
('Shopping', 'expense', 'Clothing, electronics, household items'),
('Entertainment', 'expense', 'Movies, games, hobbies'),
('Travel', 'expense', 'Vacations, business travel'),
('Healthcare', 'expense', 'Medical expenses, insurance'),
('Education', 'expense', 'Tuition, books, courses'),
('Personal Care', 'expense', 'Beauty, grooming, fitness'),
('Taxes', 'expense', 'Income tax, property tax'),
('Charity', 'expense', 'Donations and charity'),
('Business', 'expense', 'Business expenses'),
('Fees & Charges', 'expense', 'Bank fees, service charges'),
('Kids', 'expense', 'Childcare, toys, education'),
('Pets', 'expense', 'Pet food, vet visits, supplies'),
('Automotive', 'expense', 'Car maintenance, insurance'),
('Other', 'expense', 'Other miscellaneous expenses');