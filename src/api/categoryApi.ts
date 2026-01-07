// Category API functions

// const API_BASE_URL = 'http://localhost:8000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Category {
  id: number;
  name: string;
  type: string;
}

export const categoryApi = {
  async fetchCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/transaction_categories/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      }
      return [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getCategoryIdByName(categories: Category[], categoryName: string): number | null {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.id : null;
  },
};