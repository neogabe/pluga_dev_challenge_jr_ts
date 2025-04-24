import { SearchBar } from '@/components/SearchBar';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';
import { mockTools, mockSearchTools } from './mocks/tools';

describe('SearchBar', () => {
  it('deve renderizar o input de busca', () => {
    const onFilteredToolsChange = vi.fn();
    render(
      <SearchBar
        tools={mockTools}
        onFilteredToolsChange={onFilteredToolsChange}
      />
    );

    expect(
      screen.getByPlaceholderText('Buscar +100 ferramentas')
    ).toBeInTheDocument();
  });

  it('deve filtrar ferramentas "Google" quando o usuário digitar "google"', () => {
    const onFilteredToolsChange = vi.fn();
    render(
      <SearchBar
        tools={mockSearchTools}
        onFilteredToolsChange={onFilteredToolsChange}
      />
    );

    const searchInput = screen.getByPlaceholderText('Buscar +100 ferramentas');
    fireEvent.change(searchInput, { target: { value: 'google' } });

    const expectedTools = mockSearchTools.filter((tool) =>
      tool.name.toLowerCase().includes('google')
    );

    expect(onFilteredToolsChange).toHaveBeenCalledWith(expectedTools);
  });

  it('deve ser case insensitive na busca', () => {
    const onFilteredToolsChange = vi.fn();
    render(<SearchBar tools={mockSearchTools} onFilteredToolsChange={onFilteredToolsChange} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar +100 ferramentas');
    fireEvent.change(searchInput, { target: { value: 'GOOGLE' } });
    
    const expectedTools = mockSearchTools.filter((tool) =>
      tool.name.toLowerCase().includes('google')
    );

    expect(onFilteredToolsChange).toHaveBeenCalledWith(expectedTools);
  });

  it('deve retornar array vazio quando nenhuma ferramenta corresponder à busca', () => {
    const onFilteredToolsChange = vi.fn();
    render(<SearchBar tools={mockSearchTools} onFilteredToolsChange={onFilteredToolsChange} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar +100 ferramentas');
    fireEvent.change(searchInput, { target: { value: 'ferramenta inexistente' } });
    
    expect(onFilteredToolsChange).toHaveBeenCalledWith([]);
  });

  it('deve retornar todas as ferramentas quando o input estiver vazio', () => {
    const onFilteredToolsChange = vi.fn();
    render(<SearchBar tools={mockSearchTools} onFilteredToolsChange={onFilteredToolsChange} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar +100 ferramentas');
    fireEvent.change(searchInput, { target: { value: '' } });
    
    expect(onFilteredToolsChange).toHaveBeenCalledWith(mockSearchTools);
  });
});
