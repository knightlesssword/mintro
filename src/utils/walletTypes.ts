// Comprehensive wallet types with Lucide icons and color schemes
// Organized by categories for easy selection in wallet creation modal

import {
  Wallet, CreditCard, Landmark, PiggyBank, Coins, HandCoins, Banknote,
  CircleDollarSign, BadgeDollarSign, DollarSign, Euro, PoundSterling, JapaneseYen, IndianRupee, Bitcoin,
  Key, QrCode, Layers, Globe, ShieldCheck, Smartphone, Laptop, Tablet, Cloud, Wifi, Plug, Database,
  Usb, HardDrive, Server, Archive, Box, Boxes, FolderLock, FileLock, Users, Building, Briefcase,
  User, Lock, Shield, EyeOff, Fingerprint, ScanFace, Receipt, ReceiptText, ShoppingCart, Nfc, ArrowLeftRight,
  KeyRound, LockKeyhole, Unlock, Scan, ScanLine, IdCard, BadgeCheck, UsersRound, UserPlus, Network, Share2,
  GitMerge, Workflow, Split, Clock, Timer, Vault, ArchiveRestore, CalendarClock, History,
  Copy, Clipboard, ClipboardCheck, Download, Upload, RotateCcw, RefreshCcw,
  SlidersHorizontal, Gauge, Scale, TrendingUp, TrendingDown, Percent,
  Store, ShoppingBag, BriefcaseBusiness, Building2, Barcode,
  Ghost, ShieldAlert, Code, Terminal, Cpu, Braces, FunctionSquare, Bot,
  Folder, FolderOpen, Layers3
} from 'lucide-react';

export interface WalletTypeOption {
  name: string;
  display_name: string;
  icon: string;
  icon_color: string;
  description: string;
  category: string;
  IconComponent?: React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number | string }>;
}

// Icon mapping for all wallet types
export const IconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; size?: number | string }>> = {
  'Wallet': Wallet,
  'WalletCards': Wallet,
  'CreditCard': CreditCard,
  'Landmark': Landmark,
  'PiggyBank': PiggyBank,
  'Coins': Coins,
  'HandCoins': HandCoins,
  'Banknote': Banknote,
  'CircleDollarSign': CircleDollarSign,
  'BadgeDollarSign': BadgeDollarSign,
  'DollarSign': DollarSign,
  'Euro': Euro,
  'PoundSterling': PoundSterling,
  'JapaneseYen': JapaneseYen,
  'IndianRupee': IndianRupee,
  'Bitcoin': Bitcoin,
  'Key': Key,
  'QrCode': QrCode,
  'Layers': Layers,
  'Globe': Globe,
  'ShieldCheck': ShieldCheck,
  'Smartphone': Smartphone,
  'Laptop': Laptop,
  'Tablet': Tablet,
  'Cloud': Cloud,
  'Wifi': Wifi,
  'Plug': Plug,
  'Database': Database,
  'Usb': Usb,
  'HardDrive': HardDrive,
  'Server': Server,
  'Archive': Archive,
  'Box': Box,
  'Boxes': Boxes,
  'FolderLock': FolderLock,
  'FileLock': FileLock,
  'Users': Users,
  'Building': Building,
  'Briefcase': Briefcase,
  'User': User,
  'Lock': Lock,
  'Shield': Shield,
  'EyeOff': EyeOff,
  'Fingerprint': Fingerprint,
  'ScanFace': ScanFace,
  'Receipt': Receipt,
  'ReceiptText': ReceiptText,
  'ShoppingCart': ShoppingCart,
  'Nfc': Nfc,
  'ArrowLeftRight': ArrowLeftRight,
  'KeyRound': KeyRound,
  'LockKeyhole': LockKeyhole,
  'Unlock': Unlock,
  'Scan': Scan,
  'ScanLine': ScanLine,
  'IdCard': IdCard,
  'BadgeCheck': BadgeCheck,
  'UsersRound': UsersRound,
  'UserPlus': UserPlus,
  'Network': Network,
  'Share2': Share2,
  'GitMerge': GitMerge,
  'Workflow': Workflow,
  'Split': Split,
  'Clock': Clock,
  'Timer': Timer,
  'Vault': Vault,
  'ArchiveRestore': ArchiveRestore,
  'CalendarClock': CalendarClock,
  'History': History,
  'Copy': Copy,
  'Clipboard': Clipboard,
  'ClipboardCheck': ClipboardCheck,
  'Download': Download,
  'Upload': Upload,
  'RotateCcw': RotateCcw,
  'RefreshCcw': RefreshCcw,
  'SlidersHorizontal': SlidersHorizontal,
  'Gauge': Gauge,
  'Scale': Scale,
  'TrendingUp': TrendingUp,
  'TrendingDown': TrendingDown,
  'Percent': Percent,
  'Store': Store,
  'ShoppingBag': ShoppingBag,
  'BriefcaseBusiness': BriefcaseBusiness,
  'Building2': Building2,
  'Barcode': Barcode,
  'Ghost': Ghost,
  'ShieldAlert': ShieldAlert,
  'Code': Code,
  'Terminal': Terminal,
  'Cpu': Cpu,
  'Braces': Braces,
  'FunctionSquare': FunctionSquare,
  'Bot': Bot,
  'Folder': Folder,
  'FolderOpen': FolderOpen,
  'Layers3': Layers3,
};

// Color palette for wallet types
const COLORS = {
  primary: '#3b82f6',      // Blue
  success: '#22c55e',      // Green
  warning: '#f59e0b',      // Amber
  danger: '#ef4444',       // Red
  neutral: '#6b7280',      // Gray
  purple: '#8b5cf6',       // Purple
  cyan: '#06b6d4',         // Cyan
  orange: '#f97316',       // Orange
  teal: '#10b981',         // Teal
  emerald: '#10b981',      // Emerald
  pink: '#ec4899',         // Pink
  indigo: '#6366f1',       // Indigo
  lime: '#84cc16',         // Lime
  sky: '#0ea5e9',          // Sky
  rose: '#f43f5e',         // Rose
  amber: '#f59e0b',        // Amber
  green: '#22c55e',        // Green
  red: '#ef4444',          // Red
  blue: '#3b82f6',         // Blue
  gray: '#6b7280',         // Gray
  black: '#0f172a',        // Black
  white: '#ffffff',        // White
  gold: '#eab308',         // Gold
  silver: '#9ca3af',       // Silver
  bronze: '#f59e0b',       // Bronze
  yellow: '#eab308',       // Yellow
  brown: '#92400e',        // Brown
};

// Core / Generic Wallets
export const CORE_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'wallet',
    display_name: 'Wallet',
    icon: 'Wallet',
    icon_color: COLORS.success,
    description: 'General purpose wallet',
    category: 'Core'
  },
  {
    name: 'credit_card',
    display_name: 'Credit Card',
    icon: 'CreditCard',
    icon_color: COLORS.blue,
    description: 'Credit card account',
    category: 'Core'
  },
  {
    name: 'bank_account',
    display_name: 'Bank Account',
    icon: 'Landmark',
    icon_color: COLORS.neutral,
    description: 'Traditional bank account',
    category: 'Core'
  },
  {
    name: 'savings',
    display_name: 'Savings',
    icon: 'PiggyBank',
    icon_color: COLORS.emerald,
    description: 'Savings account',
    category: 'Core'
  },
  {
    name: 'coins',
    display_name: 'Coins',
    icon: 'Coins',
    icon_color: COLORS.gold,
    description: 'Physical coins',
    category: 'Core'
  },
  {
    name: 'hand_coins',
    display_name: 'Cash',
    icon: 'HandCoins',
    icon_color: COLORS.green,
    description: 'Physical cash money',
    category: 'Core'
  },
  {
    name: 'banknote',
    display_name: 'Banknote',
    icon: 'Banknote',
    icon_color: COLORS.amber,
    description: 'Paper currency',
    category: 'Core'
  }
];

// Cash & Currency-Specific Wallets
export const CASH_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'circle_dollar_sign',
    display_name: 'Dollar',
    icon: 'CircleDollarSign',
    icon_color: COLORS.green,
    description: 'US Dollar wallet',
    category: 'Cash'
  },
  {
    name: 'badge_dollar_sign',
    display_name: 'Currency',
    icon: 'BadgeDollarSign',
    icon_color: COLORS.gold,
    description: 'General currency wallet',
    category: 'Cash'
  },
  {
    name: 'dollar_sign',
    display_name: 'USD',
    icon: 'DollarSign',
    icon_color: COLORS.green,
    description: 'US Dollar',
    category: 'Cash'
  },
  {
    name: 'euro',
    display_name: 'Euro',
    icon: 'Euro',
    icon_color: COLORS.indigo,
    description: 'Euro currency',
    category: 'Cash'
  },
  {
    name: 'pound_sterling',
    display_name: 'Pound',
    icon: 'PoundSterling',
    icon_color: COLORS.rose,
    description: 'British Pound',
    category: 'Cash'
  },
  {
    name: 'japanese_yen',
    display_name: 'Yen',
    icon: 'JapaneseYen',
    icon_color: COLORS.red,
    description: 'Japanese Yen',
    category: 'Cash'
  },
  {
    name: 'indian_rupee',
    display_name: 'Rupee',
    icon: 'IndianRupee',
    icon_color: COLORS.emerald,
    description: 'Indian Rupee',
    category: 'Cash'
  },
];

// Crypto & Web3 Wallet Types
export const CRYPTO_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'bitcoin',
    display_name: 'Bitcoin',
    icon: 'Bitcoin',
    icon_color: COLORS.orange,
    description: 'Bitcoin wallet',
    category: 'Crypto'
  },
  {
    name: 'multi_chain',
    display_name: 'Multi-Chain',
    icon: 'Layers',
    icon_color: COLORS.cyan,
    description: 'Multi-chain wallet',
    category: 'Crypto'
  },
  {
    name: 'on_chain',
    display_name: 'On-Chain',
    icon: 'Globe',
    icon_color: COLORS.sky,
    description: 'Decentralized wallet',
    category: 'Crypto'
  },
  {
    name: 'secure_wallet',
    display_name: 'Secure',
    icon: 'ShieldCheck',
    icon_color: COLORS.green,
    description: 'Audited wallet',
    category: 'Crypto'
  }
];

// Hot Wallets (Connected / Software-Based)
export const HOT_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'smartphone',
    display_name: 'Mobile',
    icon: 'Smartphone',
    icon_color: COLORS.blue,
    description: 'Mobile wallet',
    category: 'Hot'
  },
  {
    name: 'laptop',
    display_name: 'Desktop',
    icon: 'Laptop',
    icon_color: COLORS.gray,
    description: 'Desktop wallet',
    category: 'Hot'
  },
  {
    name: 'tablet',
    display_name: 'Tablet',
    icon: 'Tablet',
    icon_color: COLORS.indigo,
    description: 'Tablet wallet',
    category: 'Hot'
  },
  {
    name: 'cloud',
    display_name: 'Cloud',
    icon: 'Cloud',
    icon_color: COLORS.sky,
    description: 'Cloud-based wallet',
    category: 'Hot'
  },
  {
    name: 'wifi',
    display_name: 'Connected',
    icon: 'Wifi',
    icon_color: COLORS.green,
    description: 'Connected wallet',
    category: 'Hot'
  },
  {
    name: 'plug',
    display_name: 'Plugged In',
    icon: 'Plug',
    icon_color: COLORS.yellow,
    description: 'Always connected',
    category: 'Hot'
  },
  {
    name: 'database',
    display_name: 'Database',
    icon: 'Database',
    icon_color: COLORS.purple,
    description: 'Database wallet',
    category: 'Hot'
  },
  {
    name: 'folder',
    display_name: 'Folder',
    icon: 'Folder',
    icon_color: COLORS.amber,
    description: 'Folder wallet',
    category: 'Hot'
  },
  {
    name: 'folder_open',
    display_name: 'Folder Open',
    icon: 'FolderOpen',
    icon_color: COLORS.amber,
    description: 'Open folder',
    category: 'Hot'
  }
];

// Cold Wallets (Offline / Hardware)
export const COLD_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'usb',
    display_name: 'USB',
    icon: 'Usb',
    icon_color: COLORS.blue,
    description: 'USB wallet',
    category: 'Cold'
  },
  {
    name: 'hard_drive',
    display_name: 'Hard Drive',
    icon: 'HardDrive',
    icon_color: COLORS.gray,
    description: 'Hard drive wallet',
    category: 'Cold'
  },
  {
    name: 'server',
    display_name: 'Server',
    icon: 'Server',
    icon_color: COLORS.indigo,
    description: 'Server wallet',
    category: 'Cold'
  },
  {
    name: 'archive',
    display_name: 'Archive',
    icon: 'Archive',
    icon_color: COLORS.amber,
    description: 'Archived wallet',
    category: 'Cold'
  },
  {
    name: 'box',
    display_name: 'Box',
    icon: 'Box',
    icon_color: COLORS.brown,
    description: 'Physical box',
    category: 'Cold'
  },
  {
    name: 'boxes',
    display_name: 'Boxes',
    icon: 'Boxes',
    icon_color: COLORS.brown,
    description: 'Multiple boxes',
    category: 'Cold'
  },
  {
    name: 'folder_lock',
    display_name: 'Locked Folder',
    icon: 'FolderLock',
    icon_color: COLORS.red,
    description: 'Locked folder',
    category: 'Cold'
  },
  {
    name: 'file_lock',
    display_name: 'Locked File',
    icon: 'FileLock',
    icon_color: COLORS.red,
    description: 'Locked file',
    category: 'Cold'
  }
];

// Custodial vs Non-Custodial
export const CUSTODIAL_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'custodial',
    display_name: 'Custodial',
    icon: 'Users',
    icon_color: COLORS.blue,
    description: 'Custodial wallet',
    category: 'Custodial'
  },
  {
    name: 'building',
    display_name: 'Building',
    icon: 'Building',
    icon_color: COLORS.gray,
    description: 'Institutional wallet',
    category: 'Custodial'
  },
  {
    name: 'landmark',
    display_name: 'Landmark',
    icon: 'Landmark',
    icon_color: COLORS.neutral,
    description: 'Bank wallet',
    category: 'Custodial'
  },
  {
    name: 'briefcase',
    display_name: 'Briefcase',
    icon: 'Briefcase',
    icon_color: COLORS.brown,
    description: 'Business wallet',
    category: 'Custodial'
  }
];

export const NON_CUSTODIAL_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'non_custodial',
    display_name: 'Non-Custodial',
    icon: 'User',
    icon_color: COLORS.green,
    description: 'Self-custodial wallet',
    category: 'Non-Custodial'
  },
  {
    name: 'private_key',
    display_name: 'Private Key',
    icon: 'Key',
    icon_color: COLORS.purple,
    description: 'Key-based wallet',
    category: 'Non-Custodial'
  },
  {
    name: 'lock',
    display_name: 'Lock',
    icon: 'Lock',
    icon_color: COLORS.red,
    description: 'Locked wallet',
    category: 'Non-Custodial'
  },
  {
    name: 'shield',
    display_name: 'Shield',
    icon: 'Shield',
    icon_color: COLORS.green,
    description: 'Protected wallet',
    category: 'Non-Custodial'
  }
];

// Security & Privacy Focused Wallets
export const SECURITY_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'lock',
    display_name: 'Lock',
    icon: 'Lock',
    icon_color: COLORS.red,
    description: 'Locked wallet',
    category: 'Security'
  },
  {
    name: 'shield_check',
    display_name: 'Verified',
    icon: 'ShieldCheck',
    icon_color: COLORS.green,
    description: 'Verified wallet',
    category: 'Security'
  },
  {
    name: 'fingerprint',
    display_name: 'Fingerprint',
    icon: 'Fingerprint',
    icon_color: COLORS.blue,
    description: 'Biometric wallet',
    category: 'Security'
  },
  {
    name: 'scan_face',
    display_name: 'Face Scan',
    icon: 'ScanFace',
    icon_color: COLORS.purple,
    description: 'Face recognition',
    category: 'Security'
  }
];

// Payment & Spending Wallets
export const PAYMENT_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'receipt',
    display_name: 'Receipt',
    icon: 'Receipt',
    icon_color: COLORS.green,
    description: 'Receipt wallet',
    category: 'Payment'
  },
  {
    name: 'receipt_text',
    display_name: 'Receipt Text',
    icon: 'ReceiptText',
    icon_color: COLORS.blue,
    description: 'Detailed receipt',
    category: 'Payment'
  },
  {
    name: 'shopping_cart',
    display_name: 'Shopping',
    icon: 'ShoppingCart',
    icon_color: COLORS.red,
    description: 'Shopping wallet',
    category: 'Payment'
  },
  {
    name: 'nfc',
    display_name: 'NFC',
    icon: 'Nfc',
    icon_color: COLORS.purple,
    description: 'NFC payments',
    category: 'Payment'
  },
  {
    name: 'qr_code',
    display_name: 'QR Code',
    icon: 'QrCode',
    icon_color: COLORS.blue,
    description: 'QR payments',
    category: 'Payment'
  },
  {
    name: 'arrow_left_right',
    display_name: 'Transfer',
    icon: 'ArrowLeftRight',
    icon_color: COLORS.cyan,
    description: 'Transfer wallet',
    category: 'Payment'
  }
];

// Access / Authentication-Based Wallets
export const AUTH_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'key_round',
    display_name: 'Key Round',
    icon: 'KeyRound',
    icon_color: COLORS.gold,
    description: 'Round key',
    category: 'Auth'
  },
  {
    name: 'lock_keyhole',
    display_name: 'Lock Keyhole',
    icon: 'LockKeyhole',
    icon_color: COLORS.red,
    description: 'Keyhole lock',
    category: 'Auth'
  },
  {
    name: 'unlock',
    display_name: 'Unlock',
    icon: 'Unlock',
    icon_color: COLORS.green,
    description: 'Unlocked wallet',
    category: 'Auth'
  },
  {
    name: 'scan',
    display_name: 'Scan',
    icon: 'Scan',
    icon_color: COLORS.purple,
    description: 'Scan auth',
    category: 'Auth'
  },
  {
    name: 'scan_line',
    display_name: 'Scan Line',
    icon: 'ScanLine',
    icon_color: COLORS.blue,
    description: 'Line scanner',
    category: 'Auth'
  },
  {
    name: 'id_card',
    display_name: 'ID Card',
    icon: 'IdCard',
    icon_color: COLORS.green,
    description: 'ID authentication',
    category: 'Auth'
  },
  {
    name: 'badge_check',
    display_name: 'Badge Check',
    icon: 'BadgeCheck',
    icon_color: COLORS.green,
    description: 'Verified badge',
    category: 'Auth'
  }
];

// Multi-Sig / Shared / DAO Wallets
export const MULTI_SIG_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'users_round',
    display_name: 'Users Round',
    icon: 'UsersRound',
    icon_color: COLORS.blue,
    description: 'Round users',
    category: 'Multi-Sig'
  },
  {
    name: 'user_plus',
    display_name: 'User Plus',
    icon: 'UserPlus',
    icon_color: COLORS.green,
    description: 'Add user',
    category: 'Multi-Sig'
  },
  {
    name: 'network',
    display_name: 'Network',
    icon: 'Network',
    icon_color: COLORS.cyan,
    description: 'Network wallet',
    category: 'Multi-Sig'
  },
  {
    name: 'share_2',
    display_name: 'Share',
    icon: 'Share2',
    icon_color: COLORS.purple,
    description: 'Shared wallet',
    category: 'Multi-Sig'
  },
  {
    name: 'git_merge',
    display_name: 'Merge',
    icon: 'GitMerge',
    icon_color: COLORS.orange,
    description: 'Merged wallet',
    category: 'Multi-Sig'
  },
  {
    name: 'workflow',
    display_name: 'Workflow',
    icon: 'Workflow',
    icon_color: COLORS.blue,
    description: 'Workflow wallet',
    category: 'Multi-Sig'
  },
  {
    name: 'split',
    display_name: 'Split',
    icon: 'Split',
    icon_color: COLORS.red,
    description: 'Split wallet',
    category: 'Multi-Sig'
  }
];

// Time-Locked / Vault-Like Wallets
export const VAULT_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'clock',
    display_name: 'Clock',
    icon: 'Clock',
    icon_color: COLORS.blue,
    description: 'Time-based wallet',
    category: 'Vault'
  },
  {
    name: 'timer',
    display_name: 'Timer',
    icon: 'Timer',
    icon_color: COLORS.red,
    description: 'Timed wallet',
    category: 'Vault'
  },
  {
    name: 'vault',
    display_name: 'Vault',
    icon: 'Vault',
    icon_color: COLORS.gray,
    description: 'Secure vault',
    category: 'Vault'
  },
  {
    name: 'archive_restore',
    display_name: 'Archive Restore',
    icon: 'ArchiveRestore',
    icon_color: COLORS.amber,
    description: 'Restored archive',
    category: 'Vault'
  },
  {
    name: 'calendar_clock',
    display_name: 'Calendar Clock',
    icon: 'CalendarClock',
    icon_color: COLORS.green,
    description: 'Scheduled wallet',
    category: 'Vault'
  },
  {
    name: 'history',
    display_name: 'History',
    icon: 'History',
    icon_color: COLORS.gray,
    description: 'Historical wallet',
    category: 'Vault'
  }
];

// Backup / Recovery Wallets
export const BACKUP_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'copy',
    display_name: 'Copy',
    icon: 'Copy',
    icon_color: COLORS.blue,
    description: 'Copied wallet',
    category: 'Backup'
  },
  {
    name: 'clipboard',
    display_name: 'Clipboard',
    icon: 'Clipboard',
    icon_color: COLORS.gray,
    description: 'Clipboard wallet',
    category: 'Backup'
  },
  {
    name: 'clipboard_check',
    display_name: 'Clipboard Check',
    icon: 'ClipboardCheck',
    icon_color: COLORS.green,
    description: 'Checked clipboard',
    category: 'Backup'
  },
  {
    name: 'download',
    display_name: 'Download',
    icon: 'Download',
    icon_color: COLORS.blue,
    description: 'Downloaded wallet',
    category: 'Backup'
  },
  {
    name: 'upload',
    display_name: 'Upload',
    icon: 'Upload',
    icon_color: COLORS.green,
    description: 'Uploaded wallet',
    category: 'Backup'
  },
  {
    name: 'rotate_ccw',
    display_name: 'Rotate CCW',
    icon: 'RotateCcw',
    icon_color: COLORS.purple,
    description: 'Rotated wallet',
    category: 'Backup'
  },
  {
    name: 'refresh_ccw',
    display_name: 'Refresh CCW',
    icon: 'RefreshCcw',
    icon_color: COLORS.cyan,
    description: 'Refreshed wallet',
    category: 'Backup'
  }
];

// Spending-Control / Budget Wallets
export const BUDGET_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'sliders_horizontal',
    display_name: 'Sliders',
    icon: 'SlidersHorizontal',
    icon_color: COLORS.blue,
    description: 'Adjustable wallet',
    category: 'Budget'
  },
  {
    name: 'gauge',
    display_name: 'Gauge',
    icon: 'Gauge',
    icon_color: COLORS.green,
    description: 'Gauge wallet',
    category: 'Budget'
  },
  {
    name: 'scale',
    display_name: 'Scale',
    icon: 'Scale',
    icon_color: COLORS.gray,
    description: 'Balanced wallet',
    category: 'Budget'
  },
  {
    name: 'trending_up',
    display_name: 'Trending Up',
    icon: 'TrendingUp',
    icon_color: COLORS.green,
    description: 'Growing wallet',
    category: 'Budget'
  },
  {
    name: 'trending_down',
    display_name: 'Trending Down',
    icon: 'TrendingDown',
    icon_color: COLORS.red,
    description: 'Declining wallet',
    category: 'Budget'
  },
  {
    name: 'percent',
    display_name: 'Percent',
    icon: 'Percent',
    icon_color: COLORS.amber,
    description: 'Percentage wallet',
    category: 'Budget'
  }
];

// Merchant / Business Wallets
export const BUSINESS_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'store',
    display_name: 'Store',
    icon: 'Store',
    icon_color: COLORS.blue,
    description: 'Store wallet',
    category: 'Business'
  },
  {
    name: 'shopping_bag',
    display_name: 'Shopping Bag',
    icon: 'ShoppingBag',
    icon_color: COLORS.red,
    description: 'Shopping wallet',
    category: 'Business'
  },
  {
    name: 'briefcase_business',
    display_name: 'Business',
    icon: 'BriefcaseBusiness',
    icon_color: COLORS.gray,
    description: 'Business wallet',
    category: 'Business'
  },
  {
    name: 'building_2',
    display_name: 'Building 2',
    icon: 'Building2',
    icon_color: COLORS.neutral,
    description: 'Building wallet',
    category: 'Business'
  },
  {
    name: 'landmark',
    display_name: 'Landmark',
    icon: 'Landmark',
    icon_color: COLORS.neutral,
    description: 'Landmark wallet',
    category: 'Business'
  },
  {
    name: 'barcode',
    display_name: 'Barcode',
    icon: 'Barcode',
    icon_color: COLORS.black,
    description: 'Barcode wallet',
    category: 'Business'
  }
];

// Privacy / Stealth Wallets
export const PRIVACY_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'eye_off',
    display_name: 'Hidden',
    icon: 'EyeOff',
    icon_color: COLORS.gray,
    description: 'Hidden wallet',
    category: 'Privacy'
  },
  {
    name: 'ghost',
    display_name: 'Ghost',
    icon: 'Ghost',
    icon_color: COLORS.white,
    description: 'Ghost wallet',
    category: 'Privacy'
  },
  {
    name: 'shield_alert',
    display_name: 'Shield Alert',
    icon: 'ShieldAlert',
    icon_color: COLORS.red,
    description: 'Alerted wallet',
    category: 'Privacy'
  }
];

// Experimental / Advanced Wallets
export const EXPERIMENTAL_WALLET_TYPES: WalletTypeOption[] = [
  {
    name: 'code',
    display_name: 'Code',
    icon: 'Code',
    icon_color: COLORS.purple,
    description: 'Code wallet',
    category: 'Experimental'
  },
  {
    name: 'terminal',
    display_name: 'Terminal',
    icon: 'Terminal',
    icon_color: COLORS.green,
    description: 'Terminal wallet',
    category: 'Experimental'
  },
  {
    name: 'cpu',
    display_name: 'CPU',
    icon: 'Cpu',
    icon_color: COLORS.blue,
    description: 'CPU wallet',
    category: 'Experimental'
  },
  {
    name: 'braces',
    display_name: 'Braces',
    icon: 'Braces',
    icon_color: COLORS.purple,
    description: 'Braces wallet',
    category: 'Experimental'
  },
  {
    name: 'function_square',
    display_name: 'Function',
    icon: 'FunctionSquare',
    icon_color: COLORS.cyan,
    description: 'Function wallet',
    category: 'Experimental'
  },
  {
    name: 'bot',
    display_name: 'Bot',
    icon: 'Bot',
    icon_color: COLORS.green,
    description: 'Bot wallet',
    category: 'Experimental'
  }
];

// Visual Variants / UI Differentiators
export const VISUAL_WALLET_TYPES: WalletTypeOption[] = [
];

// Complete wallet types array
export const ALL_WALLET_TYPES: WalletTypeOption[] = [
  ...CORE_WALLET_TYPES,
  ...CASH_WALLET_TYPES,
  ...CRYPTO_WALLET_TYPES,
  ...HOT_WALLET_TYPES,
  ...COLD_WALLET_TYPES,
  ...CUSTODIAL_WALLET_TYPES,
  ...NON_CUSTODIAL_WALLET_TYPES,
  ...SECURITY_WALLET_TYPES,
  ...PAYMENT_WALLET_TYPES,
  ...AUTH_WALLET_TYPES,
  ...MULTI_SIG_WALLET_TYPES,
  ...VAULT_WALLET_TYPES,
  ...BACKUP_WALLET_TYPES,
  ...BUDGET_WALLET_TYPES,
  ...BUSINESS_WALLET_TYPES,
  ...PRIVACY_WALLET_TYPES,
  ...EXPERIMENTAL_WALLET_TYPES,
  ...VISUAL_WALLET_TYPES
];

// Get wallet types by category
export const getWalletTypesByCategory = (category: string): WalletTypeOption[] => {
  return ALL_WALLET_TYPES.filter(type => type.category.toLowerCase() === category.toLowerCase());
};

// Get all categories
export const getWalletCategories = (): string[] => {
  const categories = ALL_WALLET_TYPES.map(type => type.category);
  return [...new Set(categories)];
};

// Get wallet type by name
export const getWalletTypeByName = (name: string): WalletTypeOption | undefined => {
  return ALL_WALLET_TYPES.find(type => type.name === name);
};

// Get default wallet type
export const getDefaultWalletType = (): WalletTypeOption => {
  return CORE_WALLET_TYPES[0]; // Default to first core wallet type
};