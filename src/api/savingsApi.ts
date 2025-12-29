// Savings Goals API functions
import type { SavingsGoal } from '../context/AppContext';

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export interface SavingsGoalCreateData {
  name: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  target_date: string;
  savings_type?: 'individual' | 'linked';
  linked_wallet_id?: string | number | null;
}

export interface SavingsGoalBackend {
  id: number;
  name: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  target_date: string;
  savings_type: string;
  linked_wallet_id: number | null;
}

export const savingsApi = {
  async fetchSavingsGoals(user_id: string): Promise<SavingsGoal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user_id}/savings_goals/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const savingsGoalsData: SavingsGoalBackend[] = await response.json();
        // Convert backend savings goals data to frontend format
        return savingsGoalsData.map((goal: SavingsGoalBackend) => ({
          id: goal.id.toString(),
          name: goal.name,
          description: goal.description,
          goalAmount: goal.goal_amount,
          currentAmount: goal.current_amount,
          targetDate: goal.target_date,
          savingsType: goal.savings_type as 'individual' | 'linked',
          linkedWalletId: goal.linked_wallet_id ? goal.linked_wallet_id.toString() : undefined,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching savings goals:', error);
      return [];
    }
  },

  async addSavingsGoal(user_id: string, goal: Omit<SavingsGoal, 'id'>): Promise<SavingsGoal | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user_id}/savings_goals/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: goal.name,
          description: goal.description,
          goal_amount: goal.goalAmount,
          current_amount: goal.currentAmount,
          target_date: goal.targetDate,
          savings_type: goal.savingsType,
          linked_wallet_id: goal.linkedWalletId,
        }),
      });

      if (response.ok) {
        const newGoal = await response.json();
        return {
          id: newGoal.id.toString(),
          name: newGoal.name,
          description: newGoal.description,
          goalAmount: newGoal.goal_amount,
          currentAmount: newGoal.current_amount,
          targetDate: newGoal.target_date,
          savingsType: newGoal.savings_type,
          linkedWalletId: newGoal.linked_wallet_id,
        };
      }
      return null;
    } catch (error) {
      console.error('Error adding savings goal:', error);
      throw error;
    }
  },

  async updateSavingsGoal(goalId: string, updates: Partial<SavingsGoal>, currentGoal: SavingsGoal): Promise<SavingsGoal | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/savings_goals/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updates.name || currentGoal.name,
          description: updates.description || currentGoal.description,
          goal_amount: updates.goalAmount || currentGoal.goalAmount,
          current_amount: updates.currentAmount || currentGoal.currentAmount,
          target_date: updates.targetDate || currentGoal.targetDate,
          savings_type: updates.savingsType || currentGoal.savingsType,
          linked_wallet_id: updates.linkedWalletId || currentGoal.linkedWalletId,
        }),
      });

      if (response.ok) {
        const updatedGoal = await response.json();
        return {
          id: updatedGoal.id.toString(),
          name: updatedGoal.name,
          description: updatedGoal.description,
          goalAmount: updatedGoal.goal_amount,
          currentAmount: updatedGoal.current_amount,
          targetDate: updatedGoal.target_date,
          savingsType: updatedGoal.savings_type,
          linkedWalletId: updatedGoal.linked_wallet_id,
        };
      }
      return null;
    } catch (error) {
      console.error('Error updating savings goal:', error);
      return null;
    }
  },

  async deleteSavingsGoal(goalId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/savings_goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting savings goal:', error);
      return false;
    }
  },
};