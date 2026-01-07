import React, { createContext, useContext, useState, ReactNode } from 'react';

// API imports
import { authApi, type LoginCredentials, type RegisterData } from '@/api/authApi';
import { userApi } from '@/api/userApi';
import { walletApi } from '@/api/walletApi';
import { transactionApi } from '@/api/transactionApi';
import { savingsApi } from '@/api/savingsApi';
import { categoryApi, type Category } from '@/api/categoryApi';
import { transferApi } from '@/api/transferApi';

// Service imports
import { themeService } from '@/services/themeService';
import { storageService, type StoredUser } from '@/services/storageService';
import { validationService } from '@/services/validationService';
import { transformService } from '@/services/transformService';

// Types
export interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  description: string;
  walletId: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  targetDate: string;
  savingsType?: 'individual' | 'linked';
  linkedWalletId?: string;
}

export interface Wallet {
  id: string;
  name: string;
  type: 'cash' | 'credit_card' | 'debit_card' | 'gift_card' | 'bank_account' | 'other';
  balance: number;
  color: string;
  icon_color?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  country_id: number;
  currency_id: number;
  currency?: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  savingsGoals: SavingsGoal[];
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id'>) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  wallets: Wallet[];
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  updateWallet: (id: string, updates: Partial<Wallet>) => Promise<boolean>;
  deleteWallet: (id: string) => void;
  transferBalance: (fromWalletId: string, toWalletId: string, amount: number, description: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  categories: Category[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize authentication state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = storageService.getUser();
    return !!user;
  });
  
  // Initialize dark mode state from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return themeService.getInitialTheme();
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    return transformService.createEmptyUserProfile();
  });
  const [userId, setUserId] = useState<string | null>(() => {
    const user = storageService.getUser();
    return user?.userId || null;
  });

  // Effect to restore user session on app initialization
  React.useEffect(() => {
    const restoreSession = async () => {
      const user = storageService.getUser();
      if (user) {
        try {
          setUserId(user.userId);
          
          // Fetch user profile, wallets, and savings goals to restore full session
          const [profile, walletData, goals, transactionsData, categoriesData] = await Promise.all([
            userApi.fetchUserProfile(user.userId),
            walletApi.fetchWallets(user.userId),
            savingsApi.fetchSavingsGoals(user.userId),
            transactionApi.fetchTransactions(user.userId),
            categoryApi.fetchCategories()
          ]);

          if (profile) setUserProfile(profile);
          if (walletData) setWallets(walletData);
          if (goals) setSavingsGoals(goals);
          if (transactionsData) setTransactions(transactionsData);
          if (categoriesData) setCategories(categoriesData);
        } catch (error) {
          console.error('Error restoring session:', error);
          // Clear invalid session data
          storageService.removeUser();
          setIsAuthenticated(false);
          setUserId(null);
        }
      }
    };

    restoreSession();
  }, []);

  // Effect to apply initial theme on app startup
  React.useEffect(() => {
    themeService.applyTheme(isDarkMode);
  }, [isDarkMode]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const loginResult = await authApi.login({ email, password });
      
      if (!loginResult) {
        return false;
      }
      
      // Store user info
      const userData: StoredUser = {
        userId: loginResult.user_id,
        email: loginResult.email,
      };
      storageService.setUser(userData);
      
      setUserId(loginResult.user_id);
      setIsAuthenticated(true);
      
      // Fetch user profile, wallets, and savings goals from backend
      const [profile, walletData, goals, transactionsData, categoriesData] = await Promise.all([
        userApi.fetchUserProfile(loginResult.user_id),
        walletApi.fetchWallets(loginResult.user_id),
        savingsApi.fetchSavingsGoals(loginResult.user_id),
        transactionApi.fetchTransactions(loginResult.user_id),
        categoryApi.fetchCategories()
      ]);

      if (profile) setUserProfile(profile);
      if (walletData) setWallets(walletData);
      if (goals) setSavingsGoals(goals);
      if (transactionsData) setTransactions(transactionsData);
      if (categoriesData) setCategories(categoriesData);
      
      return true;
      
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    return await authApi.register(userData);
  };

  const logout = () => {
    // Clear user session
    storageService.removeUser();
    setIsAuthenticated(false);
    setUserId(null);
    setWallets([]);
    
    // Reset other state to empty
    setUserProfile(transformService.createEmptyUserProfile());
    setTransactions([]);
    setSavingsGoals([]);
  };

  const toggleDarkMode = () => {
    const { isDarkMode: newIsDarkMode } = themeService.toggleTheme(isDarkMode);
    setIsDarkMode(newIsDarkMode);
  };

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      // Get the wallet to validate balance
      const wallet = wallets.find(w => w.id === transaction.walletId);
      if (!wallet) {
        console.error('Wallet not found');
        return;
      }

      // Validate transaction
      const validation = validationService.validateTransaction(transaction, wallet);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Get category ID from the database
      const categoryId = categoryApi.getCategoryIdByName(categories, transaction.category);
      
      // Convert frontend format to backend format
      const backendTransaction = {
        wallet_id: parseInt(transaction.walletId),
        category_id: categoryId,
        amount: transaction.amount,
        date: transaction.date,
        type: transaction.type,
        description: transaction.description || '',
      };

      const newTransaction = await transactionApi.addTransaction(userId, {
        ...transaction,
        // Add the category_id to the transaction for the API call
        walletId: backendTransaction.wallet_id.toString(),
      });

      if (newTransaction) {
        setTransactions(prev => transformService.prependTransaction(prev, newTransaction));
        
        // Update wallet balance in local state
        setWallets(prev => transformService.updateWalletBalance(prev, transaction.walletId, transaction.amount, transaction.type));
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error; // Re-throw to allow UI to handle it
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      // Get the transaction before deleting to restore wallet balance
      const transactionToDelete = transactions.find(t => t.id === id);
      if (!transactionToDelete) {
        console.error('Transaction not found');
        return;
      }

      const success = await transactionApi.deleteTransaction(id);
      
      if (success) {
        setTransactions(prev => transformService.removeTransactionById(prev, id));
        
        // Restore wallet balance in local state
        setWallets(prev => transformService.restoreWalletBalance(
          prev, 
          transactionToDelete.walletId, 
          transactionToDelete.amount, 
          transactionToDelete.type
        ));
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const addSavingsGoal = async (goal: Omit<SavingsGoal, 'id'>) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      const newGoal = await savingsApi.addSavingsGoal(userId, goal);
      
      if (newGoal) {
        setSavingsGoals(prev => transformService.appendSavingsGoal(prev, newGoal));
      }
    } catch (error) {
      console.error('Error adding savings goal:', error);
      throw error;
    }
  };

  const updateSavingsGoal = async (id: string, updates: Partial<SavingsGoal>) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      // Get the current goal to include all required fields
      const currentGoal = savingsGoals.find(g => g.id === id);
      if (!currentGoal) {
        console.error('Goal not found');
        return;
      }

      const updatedGoal = await savingsApi.updateSavingsGoal(id, updates, currentGoal);
      
      if (updatedGoal) {
        setSavingsGoals(prev => transformService.updateSavingsGoalById(prev, id, updatedGoal));
      }
    } catch (error) {
      console.error('Error updating savings goal:', error);
    }
  };

  const deleteSavingsGoal = async (id: string) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      const success = await savingsApi.deleteSavingsGoal(id);
      
      if (success) {
        setSavingsGoals(prev => transformService.removeSavingsGoalById(prev, id));
      }
    } catch (error) {
      console.error('Error deleting savings goal:', error);
    }
  };

  const addWallet = async (wallet: Omit<Wallet, 'id'>) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      const newWallet = await walletApi.addWallet(userId, wallet);
      
      if (newWallet) {
        setWallets(prev => transformService.appendWallet(prev, newWallet));
      }
    } catch (error) {
      console.error('Error adding wallet:', error);
    }
  };

  const updateWallet = async (id: string, updates: Partial<Wallet>): Promise<boolean> => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return false;
      }

      // Get current wallet to ensure we have all required fields
      const currentWallet = wallets.find(w => w.id === id);
      if (!currentWallet) {
        console.error('Wallet not found for ID:', id);
        return false;
      }

      const updatedWallet = await walletApi.updateWallet(id, updates, currentWallet);
      
      if (updatedWallet) {
        setWallets(prev => transformService.updateWalletById(prev, id, updatedWallet));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating wallet:', error);
      return false;
    }
  };

  const deleteWallet = async (id: string) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      const success = await walletApi.deleteWallet(id);
      
      if (success) {
        setWallets(prev => transformService.removeWalletById(prev, id));
      }
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  const transferBalance = async (fromWalletId: string, toWalletId: string, amount: number, description: string) => {
    if (!userId) {
      throw new Error('No user ID available');
    }

    const fromWallet = wallets.find(w => w.id === fromWalletId);
    const toWallet = wallets.find(w => w.id === toWalletId);

    if (!fromWallet || !toWallet) {
      throw new Error('Wallet not found');
    }

    // Validate transfer
    const validation = validationService.validateWalletTransfer(fromWallet, toWallet, amount, description);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Make API call to transfer balance
    const success = await transferApi.transferBalance(userId, {
      from_wallet_id: parseInt(fromWalletId),
      to_wallet_id: parseInt(toWalletId),
      amount: amount,
      description: description
    });

    if (success) {
      // Update local state
      setWallets(prev => {
        let updated = transformService.updateWalletBalance(prev, fromWalletId, amount, 'expense');
        updated = transformService.updateWalletBalance(updated, toWalletId, amount, 'income');
        return updated;
      });

      // Add transfer transactions
      const date = transformService.getCurrentDateString();
      const [expenseTransaction, incomeTransaction] = transformService.createTransferTransactions(
        fromWallet,
        toWallet,
        amount,
        description,
        date
      );

      setTransactions(prev => [
        expenseTransaction,
        incomeTransaction,
        ...prev
      ]);
    } else {
      throw new Error('Transfer failed');
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!userId) {
        console.error('No user ID available');
        return;
      }

      const success = await userApi.updateUserProfile(userId, updates);
      
      if (success) {
        setUserProfile(prev => ({ ...prev, ...updates }));
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      login,
      register,
      logout,
      transactions,
      addTransaction,
      deleteTransaction,
      savingsGoals,
      addSavingsGoal,
      updateSavingsGoal,
      deleteSavingsGoal,
      wallets,
      addWallet,
      updateWallet,
      deleteWallet,
      transferBalance,
      userProfile,
      updateUserProfile,
      isDarkMode,
      toggleDarkMode,
      categories,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
