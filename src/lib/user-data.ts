export interface UserData {
  name: string;
  location: string;
  hasCompletedOnboarding: boolean;
  preferences?: {
    units: 'metric' | 'imperial';
    theme: 'light' | 'dark';
  };
}

export class UserDataManager {
  private static readonly STORAGE_KEY = 'weather-dashboard-user-data';

  static getUserData(): UserData | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading user data:', error);
      return null;
    }
  }

  static saveUserData(userData: UserData): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  static updateUserData(updates: Partial<UserData>): void {
    const currentData = this.getUserData();
    if (currentData) {
      const updatedData = { ...currentData, ...updates };
      this.saveUserData(updatedData);
    }
  }

  static clearUserData(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static hasCompletedOnboarding(): boolean {
    const userData = this.getUserData();
    return userData?.hasCompletedOnboarding || false;
  }

  static completeOnboarding(name: string, location: string): void {
    const userData: UserData = {
      name,
      location,
      hasCompletedOnboarding: true,
      preferences: {
        units: 'metric',
        theme: 'dark'
      }
    };
    this.saveUserData(userData);
  }
}

