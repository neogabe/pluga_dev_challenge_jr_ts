import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ToolModal } from '@/components/ToolModal';
import { mockModalTool, mockRecentTools } from './mocks/tools';

describe('ToolModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('não deve renderizar quando tool é null', () => {
    render(
      <ToolModal
        tool={null}
        isOpen={true}
        onClose={mockOnClose}
        recentTools={[]}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('deve renderizar corretamente com uma ferramenta', () => {
    render(
      <ToolModal
        tool={mockModalTool}
        isOpen={true}
        onClose={mockOnClose}
        recentTools={[]}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(mockModalTool.name)).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockModalTool.name} icon`)
    ).toBeInTheDocument();
    expect(screen.getByText('Acessar ferramenta')).toBeInTheDocument();
  });

  it('deve chamar onClose quando o modal é fechado', () => {
    render(
      <ToolModal
        tool={mockModalTool}
        isOpen={true}
        onClose={mockOnClose}
        recentTools={[]}
      />
    );

    const closeButton = screen.getByRole('button', { name: /fechar modal/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve abrir o link da ferramenta em uma nova aba quando o botão é clicado', () => {
    const originalOpen = window.open;
    window.open = vi.fn();

    render(
      <ToolModal
        tool={mockModalTool}
        isOpen={true}
        onClose={mockOnClose}
        recentTools={[]}
      />
    );

    const accessButton = screen.getByText('Acessar ferramenta');
    fireEvent.click(accessButton);

    expect(window.open).toHaveBeenCalledWith(mockModalTool.link, '_blank');

    window.open = originalOpen;
  });

  it('deve renderizar a seção de ferramentas recentes quando houver ferramentas recentes', () => {
    render(
      <ToolModal
        tool={mockModalTool}
        isOpen={true}
        onClose={mockOnClose}
        recentTools={mockRecentTools}
      />
    );

    expect(
      screen.getByText('Últimas ferramentas visualizadas')
    ).toBeInTheDocument();

    mockRecentTools.forEach((tool) => {
      expect(screen.getByText(tool.name)).toBeInTheDocument();
      expect(screen.getByAltText(`Ícone do ${tool.name}`)).toBeInTheDocument();
    });
  });

  it('não deve renderizar a seção de ferramentas recentes quando não houver ferramentas recentes', () => {
    render(
      <ToolModal
        tool={mockModalTool}
        isOpen={true}
        onClose={mockOnClose}
        recentTools={[]}
      />
    );

    expect(
      screen.queryByText('Últimas ferramentas visualizadas')
    ).not.toBeInTheDocument();
  });
});
