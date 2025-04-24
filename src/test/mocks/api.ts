import { vi } from 'vitest';
import { mockTools } from './tools';

export const mockApiResponse = {
  fetchTools: vi.fn().mockResolvedValue(mockTools)
};