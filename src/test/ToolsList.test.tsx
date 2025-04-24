import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToolsList } from '@/components/ToolsList';
import { mockTools } from './mocks/tools';
import { fetchTools } from '@/services/api';

vi.mock('@/services/api', () => ({
  fetchTools: vi.fn(),
}));

vi.mock('@/hooks/useRecentTools', () => ({
  useRecentTools: () => ({
    recentTools: [],
    addToolToRecent: vi.fn(),
  }),
}));

describe('ToolsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchTools as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockTools
    );
  });

  it('deve renderizar o componente corretamente', async () => {
    render(<ToolsList />);

    expect(
      screen.getByPlaceholderText('Buscar +100 ferramentas')
    ).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Omie')).toBeInTheDocument();
    });

    mockTools.slice(0, 12).forEach((tool) => {
      expect(screen.getByText(tool.name)).toBeInTheDocument();
    });
  });

  it('deve exibir mensagem quando não houver ferramentas', async () => {
    (fetchTools as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    render(<ToolsList />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Ops! Parece que a ferramenta que você está procurando não está disponível no momento. 😥'
        )
      ).toBeInTheDocument();
    });
  });

  it('deve filtrar ferramentas ao digitar na barra de busca', async () => {
    render(<ToolsList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Omie')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Buscar +100 ferramentas');
    fireEvent.change(searchInput, { target: { value: 'Omie' } });

    await waitFor(() => {
      const toolNames = screen
        .getAllByText(/^[A-Za-z]/)
        .map((el) => el.textContent);
      expect(toolNames.filter((name) => name === 'Omie')).toHaveLength(1);
      expect(screen.getByText('Omie')).toBeInTheDocument();
    });
  });

  it('deve abrir o modal ao clicar em uma ferramenta', async () => {
    render(<ToolsList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Omie')).toBeInTheDocument();
    });

    const toolCard = screen.getByText('Omie').closest('div');
    fireEvent.click(toolCard!);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Acessar ferramenta')).toBeInTheDocument();
  });

  it('deve fechar o modal ao clicar no botão de fechar', async () => {
    render(<ToolsList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Omie')).toBeInTheDocument();
    });

    const toolCard = screen.getByText('Omie').closest('div');
    fireEvent.click(toolCard!);

    const closeButton = screen.getByRole('button', { name: /fechar/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('deve exibir o loading spinner durante o carregamento', async () => {
    (fetchTools as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve(mockTools), 100))
    );

    render(<ToolsList />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('deve exibir a paginação quando houver ferramentas', async () => {
    render(<ToolsList />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Omie')).toBeInTheDocument();
    });

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
