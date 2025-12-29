// User API functions
import type { UserProfile } from '../context/AppContext';

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UserProfileData {
  name: string;
  email: string;
  mobile?: string;
  dob?: string;
  country_id?: number;
  currency_id?: number;
  currency?: string;
}

export const userApi = {
  async fetchUserProfile(user_id: string): Promise<UserProfile | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        return {
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile || '',
          dob: userData.dob || '',
          country_id: userData.country_id || 1,
          currency_id: userData.currency_id || 1,
          currency: userData.currency?.code || 'INR',
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },

  async updateUserProfile(user_id: string, updates: Partial<UserProfileData>): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user_id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      return response.ok;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  },
};