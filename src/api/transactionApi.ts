// Transaction API functions
import type { Transaction } from '../context/AppContext';

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface TransactionCreateData {
  wallet_id: number;
  category_id: number | null;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  description: string;
}

export interface TransactionBackend {
  id: number;
  category: { name: string } | null;
  amount: number;
  date: string;
  type: string;
  description: string | null;
  wallet_id: number | null;
}

export const transactionApi = {
  async fetchTransactions(user_id: string): Promise<Transaction[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user_id}/transactions/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const transactionsData: TransactionBackend[] = await response.json();
        
        return transactionsData.map((transaction: TransactionBackend) => {
          // Extract category from description if category is null
          let category = transaction.category?.name || 'Other';
          if (!transaction.category && transaction.description) {
            // Try to extract category from description format "Category: Description"
            const parts = transaction.description.split(': ');
            if (parts.length > 1 && parts[0].length < 50) { // Reasonable category name length
              category = parts[0];
            }
          }
          
          // Extract clean description (remove category prefix)
          let cleanDescription = transaction.description || '';
          if (cleanDescription.includes(': ')) {
            cleanDescription = cleanDescription.split(': ').slice(1).join(': ');
          }
          
          // Handle deleted/removed wallets
          const walletId = transaction.wallet_id ? transaction.wallet_id.toString() : 'removed';
          
          return {
            id: transaction.id.toString(),
            category: category,
            amount: transaction.amount,
            date: transaction.date,
            type: transaction.type as 'income' | 'expense',
            description: cleanDescription,
            walletId: walletId,
          };
        });
      }
      return [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  },

  async addTransaction(user_id: string, transaction: Omit<Transaction, 'id'>): Promise<Transaction | null> {
    try {
      // Convert frontend format to backend format
      const backendTransaction: TransactionCreateData = {
        wallet_id: parseInt(transaction.walletId),
        category_id: null, // This should be passed from the context
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
        description: transaction.description || '',
      };

      const response = await fetch(`${API_BASE_URL}/users/${user_id}/transactions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendTransaction),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        // Convert backend response to frontend format
        return {
          id: newTransaction.id.toString(),
          category: transaction.category,
          amount: newTransaction.amount,
          date: newTransaction.date,
          type: newTransaction.type as 'income' | 'expense',
          description: newTransaction.description || transaction.description,
          walletId: newTransaction.wallet_id.toString(),
        };
      }
      return null;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  },

  async deleteTransaction(transactionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  },
};