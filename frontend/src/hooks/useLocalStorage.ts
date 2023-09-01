import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T | null>(() => {
    let currentValue;
    try {
      currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
    } catch (error) {
      currentValue = defaultValue;
    }
    return currentValue;
  });

  function setLocalStorage(newValue: T) {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }

  function removeLocalStorage() {
    localStorage.removeItem(key);
  }

  return { value, setLocalStorage, removeLocalStorage };
}
