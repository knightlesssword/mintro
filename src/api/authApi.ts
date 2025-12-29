// Authentication API functions
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  mobile: string;
  dob: string;
  country_id: number;
  currency_id: number;
}

export interface LoginResponse {
  user_id: string;
  email: string;
}

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return {
        user_id: data.user_id,
        email: data.email,
      };
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  async register(userData: RegisterData): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  },
};