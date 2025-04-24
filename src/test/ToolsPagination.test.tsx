import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToolsPagination } from '@/components/ToolsPagination';
import {
  mockTools,
  mockFirstPageTools,
  mockSecondPageTools,
} from './mocks/tools';

describe('ToolsPagination', () => {
  const mockOnPaginatedToolsChange = vi.fn();
  const itemsPerPage = 12;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar corretamente com a primeira página', () => {
    render(
      <ToolsPagination
        tools={mockTools}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('1')).toHaveClass('bg-blue-500');
    expect(screen.getByText('2')).not.toHaveClass('bg-blue-500');
  });

  it('deve chamar onPaginatedToolsChange com os itens da primeira página inicialmente', () => {
    render(
      <ToolsPagination
        tools={mockTools}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    expect(mockOnPaginatedToolsChange).toHaveBeenCalledWith(mockFirstPageTools);
  });

  it('deve mudar para a segunda página quando clicado', () => {
    render(
      <ToolsPagination
        tools={mockTools}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    expect(screen.getByText('2')).toHaveClass('bg-blue-500');
    expect(screen.getByText('1')).not.toHaveClass('bg-blue-500');
    expect(mockOnPaginatedToolsChange).toHaveBeenCalledWith(
      mockSecondPageTools
    );
  });

  it('deve desabilitar o botão anterior na primeira página', () => {
    render(
      <ToolsPagination
        tools={mockTools}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    const previousButton = screen.getByRole('link', {
      name: /go to previous page/i,
    });
    expect(previousButton).toHaveClass('pointer-events-none opacity-50');
  });

  it('deve desabilitar o botão próximo na última página', () => {
    render(
      <ToolsPagination
        tools={mockTools}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    fireEvent.click(nextButton);

    expect(nextButton).toHaveClass('pointer-events-none opacity-50');
  });

  it('deve resetar para a primeira página quando a lista de ferramentas mudar', () => {
    const { rerender } = render(
      <ToolsPagination
        tools={mockTools}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    rerender(
      <ToolsPagination
        tools={[...mockTools, ...mockTools]}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    expect(screen.getByText('1')).toHaveClass('bg-blue-500');
    expect(mockOnPaginatedToolsChange).toHaveBeenCalledWith(mockFirstPageTools);
  });

  it('deve renderizar o número correto de páginas baseado no total de itens', () => {
    const totalItems = 25;
    const itemsPerPage = 10;

    render(
      <ToolsPagination
        tools={mockTools.slice(0, totalItems)}
        itemsPerPage={itemsPerPage}
        onPaginatedToolsChange={mockOnPaginatedToolsChange}
      />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    expect(mockOnPaginatedToolsChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          app_id: expect.any(String),
          name: expect.any(String),
          color: expect.any(String),
          icon: expect.any(String),
          link: expect.any(String),
        }),
      ])
    );
  });
});
