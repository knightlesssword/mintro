// Data transformation service
import type { Transaction, Wallet, SavingsGoal } from '../context/AppContext';

export const transformService = {
  // Transaction transformations
  createTransferTransactions(
    fromWallet: Wallet,
    toWallet: Wallet,
    amount: number,
    description: string,
    date: string
  ): [Transaction, Transaction] {
    const transferId = crypto.randomUUID();

    // Expense from source wallet
    const expenseTransaction: Transaction = {
      id: transferId + '-out',
      category: 'Transfer',
      amount: amount,
      date: date,
      type: 'expense',
      description: `Transfer to ${toWallet.name}${description ? ` - ${description}` : ''}`,
      walletId: fromWallet.id
    };

    // Income to destination wallet
    const incomeTransaction: Transaction = {
      id: transferId + '-in',
      category: 'Transfer',
      amount: amount,
      date: date,
      type: 'income',
      description: `Transfer from ${fromWallet.name}${description ? ` - ${description}` : ''}`,
      walletId: toWallet.id
    };

    return [expenseTransaction, incomeTransaction];
  },

  // Wallet transformations
  updateWalletBalance(wallets: Wallet[], walletId: string, amount: number, type: 'income' | 'expense'): Wallet[] {
    return wallets.map(wallet => {
      if (wallet.id === walletId) {
        return {
          ...wallet,
          balance: type === 'expense' 
            ? wallet.balance - amount 
            : wallet.balance + amount
        };
      }
      return wallet;
    });
  },

  restoreWalletBalance(wallets: Wallet[], walletId: string, amount: number, originalType: 'income' | 'expense'): Wallet[] {
    return wallets.map(wallet => {
      if (wallet.id === walletId) {
        return {
          ...wallet,
          balance: originalType === 'expense' 
            ? wallet.balance + amount 
            : wallet.balance - amount
        };
      }
      return wallet;
    });
  },

  // User profile transformations
  createEmptyUserProfile(): { name: string; email: string; mobile: string; dob: string; country_id: number; currency_id: number } {
    return {
      name: '',
      email: '',
      mobile: '',
      dob: '',
      country_id: 1,
      currency_id: 1,
    };
  },

  // Date transformations
  getCurrentDateString(): string {
    return new Date().toISOString().split('T')[0];
  },

  // Category transformations
  extractCategoryFromDescription(description: string): { category: string; cleanDescription: string } {
    if (description.includes(': ')) {
      const parts = description.split(': ');
      if (parts.length > 1 && parts[0].length < 50) { // Reasonable category name length
        return {
          category: parts[0],
          cleanDescription: parts.slice(1).join(': ')
        };
      }
    }
    
    return {
      category: 'Other',
      cleanDescription: description
    };
  },

  // Array transformations
  prependTransaction(transactions: Transaction[], newTransaction: Transaction): Transaction[] {
    return [newTransaction, ...transactions];
  },

  removeTransactionById(transactions: Transaction[], transactionId: string): Transaction[] {
    return transactions.filter(t => t.id !== transactionId);
  },

  updateTransactionById(transactions: Transaction[], transactionId: string, updatedTransaction: Transaction): Transaction[] {
    return transactions.map(t => t.id === transactionId ? updatedTransaction : t);
  },

  // Savings goal transformations
  appendSavingsGoal(savingsGoals: SavingsGoal[], newGoal: SavingsGoal): SavingsGoal[] {
    return [...savingsGoals, newGoal];
  },

  removeSavingsGoalById(savingsGoals: SavingsGoal[], goalId: string): SavingsGoal[] {
    return savingsGoals.filter(g => g.id !== goalId);
  },

  updateSavingsGoalById(savingsGoals: SavingsGoal[], goalId: string, updatedGoal: SavingsGoal): SavingsGoal[] {
    return savingsGoals.map(g => g.id === goalId ? updatedGoal : g);
  },

  // Wallet transformations
  appendWallet(wallets: Wallet[], newWallet: Wallet): Wallet[] {
    return [...wallets, newWallet];
  },

  removeWalletById(wallets: Wallet[], walletId: string): Wallet[] {
    return wallets.filter(w => w.id !== walletId);
  },

  updateWalletById(wallets: Wallet[], walletId: string, updatedWallet: Wallet): Wallet[] {
    return wallets.map(w => w.id === walletId ? updatedWallet : w);
  },
};