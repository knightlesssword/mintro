// Transfer API functions

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface TransferData {
  from_wallet_id: number;
  to_wallet_id: number;
  amount: number;
  description: string;
}

export const transferApi = {
  async transferBalance(user_id: string, transferData: TransferData): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user_id}/transfer/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transferData),
      });

      return response.ok;
    } catch (error) {
      console.error('Error transferring balance:', error);
      return false;
    }
  },
};