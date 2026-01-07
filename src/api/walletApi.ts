// Wallet API functions
import type { Wallet } from '../context/AppContext';

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface WalletType {
  id: number;
  name: string;
}

export interface WalletCreateData {
  name: string;
  type: Wallet['type'];
  balance: number;
  color: string;
}

export interface WalletUpdateData {
  name?: string;
  type?: Wallet['type'];
  balance?: number;
  color?: string;
}

export const walletApi = {
  async fetchWalletTypes(): Promise<WalletType[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/wallet_types/`);
      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching wallet types:', error);
      return [];
    }
  },

  async fetchWallets(user_id: string): Promise<Wallet[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user_id}/wallets/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const walletData = await response.json();
        // Convert backend wallet data to frontend format
        return walletData.map((wallet: { 
          id: number; 
          name: string; 
          type: { name: string } | null; 
          balance: number; 
          color: string 
        }) => ({
          id: wallet.id.toString(),
          name: wallet.name,
          type: wallet.type?.name as Wallet['type'] || 'other',
          balance: wallet.balance,
          color: wallet.color,
          icon_color: wallet.color,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching wallets:', error);
      return [];
    }
  },

  async addWallet(user_id: string, walletData: WalletCreateData): Promise<Wallet | null> {
    try {
      // Get wallet type ID from backend
      const walletTypes = await this.fetchWalletTypes();
      const walletType = walletTypes.find(type => type.name === walletData.type);
      
      if (!walletType) {
        console.error('Wallet type not found');
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/users/${user_id}/wallets/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: walletData.name,
          type_id: walletType.id,
          balance: walletData.balance,
          color: walletData.color,
        }),
      });

      if (response.ok) {
        const newWallet = await response.json();
        // Convert backend wallet data to frontend format
        return {
          id: newWallet.id.toString(),
          name: newWallet.name,
          type: walletData.type,
          balance: newWallet.balance,
          color: newWallet.color,
          icon_color: newWallet.color,
        };
      }
      return null;
    } catch (error) {
      console.error('Error adding wallet:', error);
      return null;
    }
  },

  async updateWallet(walletId: string, updates: WalletUpdateData, currentWallet: Wallet): Promise<Wallet | null> {
    try {
      // Get wallet types for type conversion
      const walletTypes = await this.fetchWalletTypes();
      
      // Convert frontend format to backend format
      const backendUpdates: Record<string, number | string> = {
        name: currentWallet.name,
        color: currentWallet.color,
        balance: updates.balance !== undefined ? updates.balance : currentWallet.balance
      };
      
      // Handle type conversion
      const walletType = walletTypes.find(type => type.name === currentWallet.type);
      
      if (walletType) {
        backendUpdates.type_id = walletType.id;
      } else {
        console.error('Wallet type not found for:', currentWallet.type);
        return null;
      }
      
      // Override with any updates
      if (updates.name !== undefined) backendUpdates.name = updates.name;
      if (updates.color !== undefined) backendUpdates.color = updates.color;
      if (updates.balance !== undefined) backendUpdates.balance = updates.balance;
      if (updates.type !== undefined) {
        // If type is being updated, find the new type_id
        const newWalletType = walletTypes.find(type => type.name === updates.type);
        if (newWalletType) {
          backendUpdates.type_id = newWalletType.id;
        }
      }

      const response = await fetch(`${API_BASE_URL}/wallets/${walletId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendUpdates),
      });

      if (response.ok) {
        const updatedWallet = await response.json();
        return {
          id: updatedWallet.id.toString(),
          name: updatedWallet.name,
          type: updatedWallet.type?.name as Wallet['type'] || currentWallet.type,
          balance: updatedWallet.balance,
          color: updatedWallet.color,
          icon_color: updatedWallet.color,
        };
      }
      return null;
    } catch (error) {
      console.error('Error updating wallet:', error);
      return null;
    }
  },

  async deleteWallet(walletId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/wallets/${walletId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting wallet:', error);
      return false;
    }
  },
};