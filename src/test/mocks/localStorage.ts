import { mockRecentTools } from './tools';

interface StorageStore {
  [key: string]: string;
  recentTools: string;
}

export const mockLocalStorage = {
  store: {
    recentTools: JSON.stringify(mockRecentTools)
  } as StorageStore,
  getItem(key: string) {
    return this.store[key] || null;
  },
  setItem(key: string, value: string) {
    this.store[key] = value;
  },
  clear() {
    this.store = { recentTools: '' };
  }
};