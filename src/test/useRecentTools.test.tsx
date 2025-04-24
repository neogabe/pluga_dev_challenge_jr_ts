import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRecentTools } from '@/hooks/useRecentTools';
import { mockTools, mockRecentTools } from './mocks/tools';

describe('useRecentTools', () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  it('deve inicializar com lista vazia quando não há ferramentas no localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useRecentTools());

    expect(result.current.recentTools).toEqual([]);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('recentTools');
  });

  it('deve carregar ferramentas do localStorage na inicialização', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockRecentTools));

    const { result } = renderHook(() => useRecentTools());

    expect(result.current.recentTools).toEqual(mockRecentTools);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('recentTools');
  });

  it('deve adicionar uma nova ferramenta ao início da lista', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockRecentTools));
    const newTool = mockTools[0];

    const { result } = renderHook(() => useRecentTools());

    act(() => {
      result.current.addToolToRecent(newTool);
    });

    expect(result.current.recentTools[0]).toEqual(newTool);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'recentTools',
      JSON.stringify([newTool, ...mockRecentTools.slice(0, 2)])
    );
  });

  it('deve remover ferramenta duplicada e adicionar ao início', () => {
    const existingTool = mockRecentTools[0];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockRecentTools));

    const { result } = renderHook(() => useRecentTools());

    act(() => {
      result.current.addToolToRecent(existingTool);
    });

    expect(result.current.recentTools[0]).toEqual(existingTool);
    expect(result.current.recentTools).toHaveLength(3);
    expect(
      result.current.recentTools.filter((t) => t.app_id === existingTool.app_id)
    ).toHaveLength(1);
  });

  it('deve limitar o número de ferramentas recentes ao máximo definido', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockRecentTools));
    const newTool = mockTools[0];

    const { result } = renderHook(() => useRecentTools());

    act(() => {
      result.current.addToolToRecent(newTool);
    });

    expect(result.current.recentTools).toHaveLength(3);
    expect(result.current.recentTools[0]).toEqual(newTool);
    expect(result.current.recentTools[1]).toEqual(mockRecentTools[0]);
    expect(result.current.recentTools[2]).toEqual(mockRecentTools[1]);
  });

  it('deve manter a ordem das ferramentas ao adicionar uma nova', () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockRecentTools));
    const newTool = mockTools[0];

    const { result } = renderHook(() => useRecentTools());

    act(() => {
      result.current.addToolToRecent(newTool);
    });

    const expectedTools = [newTool, ...mockRecentTools.slice(0, 2)];
    expect(result.current.recentTools).toEqual(expectedTools);
  });
});
