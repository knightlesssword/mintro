// Local storage service

export interface StoredUser {
  userId: string;
  email: string;
}

export const storageService = {
  getUser(): StoredUser | null {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user from storage:', error);
      return null;
    }
  },

  setUser(userData: StoredUser): void {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  },

  removeUser(): void {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user from storage:', error);
    }
  },

  getTheme(): 'dark' | 'light' | null {
    try {
      return localStorage.getItem('theme') as 'dark' | 'light' | null;
    } catch (error) {
      console.error('Error getting theme from storage:', error);
      return null;
    }
  },

  setTheme(theme: 'dark' | 'light'): void {
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme to storage:', error);
    }
  },

  clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};