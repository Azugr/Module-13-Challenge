export const saveToLocalStorage = <T>(key: string, value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  };
  
  export const loadFromLocalStorage = <T>(key: string, initialValue: T): T => {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return initialValue;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error('Error loading from localStorage', error);
      return initialValue;
    }
  };
  
  export const removeFromLocalStorage = (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  };