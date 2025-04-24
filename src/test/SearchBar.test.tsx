import { SearchBar } from '@/components/SearchBar';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import { expect, it, vi } from 'vitest';

describe('SearchBar', () => {
  const mockTools = [
    {
      app_id: 'omie',
      name: 'Omie',
      color: '#001E27',
      icon: 'https://assets.pluga.co/apps/icons/omie/omie-icon.svg',
      link: 'https://pluga.co/ferramentas/omie/',
    },
    {
      app_id: 'hotmart',
      name: 'Hotmart',
      color: '#F04E23',
      icon: 'https://assets.pluga.co/apps/icons/hotmart/hotmart-icon.svg',
      link: 'https://pluga.co/ferramentas/hotmart/',
    },
  ];

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
  
  it('deve filtrar as ferramentas quando usuário digitar no input', () => {
    const onFilteredToolsChange = vi.fn();
    render(
      <SearchBar
        tools={mockTools}
        onFilteredToolsChange={onFilteredToolsChange}
      />
    );

    const input = screen.getByPlaceholderText('Buscar +100 ferramentas');
    fireEvent.change(input, { target: { value: 'Omie' } });

    expect(onFilteredToolsChange).toHaveBeenCalledWith([mockTools[0]]);
  });
});
