// Theme management service

export const themeService = {
  getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  },

  toggleTheme(currentIsDarkMode: boolean): { isDarkMode: boolean; theme: 'dark' | 'light' } {
    const newTheme = !currentIsDarkMode;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply theme to document
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return {
      isDarkMode: newTheme,
      theme: newTheme ? 'dark' : 'light'
    };
  },

  applyTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
};