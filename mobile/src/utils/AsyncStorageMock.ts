// Mock AsyncStorage for development
const mockStorage: { [key: string]: string } = {};

export const AsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return mockStorage[key] || null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    mockStorage[key] = value;
  },
  removeItem: async (key: string): Promise<void> => {
    delete mockStorage[key];
  },
  clear: async (): Promise<void> => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  },
  getAllKeys: async (): Promise<string[]> => {
    return Object.keys(mockStorage);
  },
  multiGet: async (keys: string[]): Promise<[string, string | null][]> => {
    return keys.map((key) => [key, mockStorage[key] || null]);
  },
  multiSet: async (keyValuePairs: [string, string][]): Promise<void> => {
    keyValuePairs.forEach(([key, value]) => {
      mockStorage[key] = value;
    });
  },
  multiRemove: async (keys: string[]): Promise<void> => {
    keys.forEach((key) => delete mockStorage[key]);
  },
};
