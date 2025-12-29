// Data validation service
import type { Wallet, Transaction } from '../context/AppContext';

export const validationService = {
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword(password: string): boolean {
    return password.length >= 6;
  },

  validateAmount(amount: number): boolean {
    return amount > 0;
  },

  validateTransaction(transaction: Omit<Transaction, 'id'>, wallet: Wallet): { isValid: boolean; error?: string } {
    // Validate amount
    if (!this.validateAmount(transaction.amount)) {
      return { isValid: false, error: 'Amount must be greater than 0' };
    }

    // Validate balance for expense transactions
    if (transaction.type === 'expense' && transaction.amount > wallet.balance) {
      return { 
        isValid: false, 
        error: `Insufficient balance. Current balance: ${wallet.balance}, Required: ${transaction.amount}` 
      };
    }

    // Validate required fields
    if (!transaction.category?.trim()) {
      return { isValid: false, error: 'Category is required' };
    }

    if (!transaction.description?.trim()) {
      return { isValid: false, error: 'Description is required' };
    }

    if (!transaction.date) {
      return { isValid: false, error: 'Date is required' };
    }

    return { isValid: true };
  },

  validateWalletTransfer(
    fromWallet: Wallet, 
    toWallet: Wallet, 
    amount: number, 
    description: string
  ): { isValid: boolean; error?: string } {
    // Validate wallets are different
    if (fromWallet.id === toWallet.id) {
      return { isValid: false, error: 'Source and destination wallets cannot be the same' };
    }

    // Validate amount
    if (!this.validateAmount(amount)) {
      return { isValid: false, error: 'Amount must be greater than 0' };
    }

    // Validate sufficient balance
    if (fromWallet.balance < amount) {
      return { isValid: false, error: 'Insufficient balance in source wallet' };
    }

    // Validate description
    if (!description.trim()) {
      return { isValid: false, error: 'Description is required' };
    }

    return { isValid: true };
  },

  validateSavingsGoal(goal: { name: string; description: string; goalAmount: number; targetDate: string }): { isValid: boolean; error?: string } {
    if (!goal.name.trim()) {
      return { isValid: false, error: 'Goal name is required' };
    }

    if (!goal.description.trim()) {
      return { isValid: false, error: 'Description is required' };
    }

    if (!this.validateAmount(goal.goalAmount)) {
      return { isValid: false, error: 'Goal amount must be greater than 0' };
    }

    if (!goal.targetDate) {
      return { isValid: false, error: 'Target date is required' };
    }

    // Validate target date is in the future
    const targetDate = new Date(goal.targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (targetDate <= today) {
      return { isValid: false, error: 'Target date must be in the future' };
    }

    return { isValid: true };
  },
};