import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T>(() => {
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
  return { value, setLocalStorage };
}
