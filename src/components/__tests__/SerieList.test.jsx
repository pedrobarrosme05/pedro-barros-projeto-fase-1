import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SerieList from '../SerieList/SerieList';
import { theme } from '../../theme';

const mockNavigate = vi.fn();
const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();
const mockOnRefresh = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('SerieList', () => {
  const mockSeries = [
    {
      id: 1,
      titulo: "Breaking Bad",
      numeroTemporadas: 5,
      dataLancamento: "2008-01-20",
      diretor: "Vince Gilligan",
      produtora: "Sony Pictures",
      categoria: "Drama",
      dataAssistida: "2023-06-15"
    },
    {
      id: 2,
      titulo: "Stranger Things",
      numeroTemporadas: 4,
      dataLancamento: "2016-07-15",
      diretor: "The Duffer Brothers",
      produtora: "Netflix",
      categoria: "Ficção Científica",
      dataAssistida: "2023-08-20"
    }
  ];

  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
    mockOnRefresh.mockClear();
  });

  it('deve renderizar lista de séries', () => {
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Minhas Séries')).toBeInTheDocument();
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.getByText('Stranger Things')).toBeInTheDocument();
    expect(screen.getByText('2 de 2 séries')).toBeInTheDocument();
  });

  it('deve exibir mensagem quando não há séries', () => {
    render(
      <TestWrapper>
        <SerieList 
          series={[]}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Nenhuma série cadastrada')).toBeInTheDocument();
    expect(screen.getByText('Comece cadastrando sua primeira série!')).toBeInTheDocument();
  });

  it('deve filtrar séries por busca', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/buscar por título/i);
    await user.type(searchInput, 'Breaking');

    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.queryByText('Stranger Things')).not.toBeInTheDocument();
    expect(screen.getByText('1 de 2 séries')).toBeInTheDocument();
  });

  it('deve filtrar séries por categoria', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    const categorySelect = screen.getByLabelText(/categoria/i);
    await user.click(categorySelect);
    await user.click(screen.getByText('Drama'));

    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.queryByText('Stranger Things')).not.toBeInTheDocument();
    expect(screen.getByText('1 de 2 séries')).toBeInTheDocument();
  });

  it('deve chamar onEdit quando clicar em editar', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    const editButton = screen.getAllByText('Editar')[0];
    await user.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockSeries[0]);
  });

  it('deve abrir dialog de confirmação ao clicar em excluir', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    const deleteButton = screen.getAllByText('Excluir')[0];
    await user.click(deleteButton);

    expect(screen.getByText('Confirmar Exclusão')).toBeInTheDocument();
    expect(screen.getByText(/tem certeza que deseja excluir a série "Breaking Bad"/i)).toBeInTheDocument();
  });

  it('deve chamar onDelete ao confirmar exclusão', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    const deleteButton = screen.getAllByText('Excluir')[0];
    await user.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /excluir/i });
    await user.click(confirmButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('deve navegar para cadastro ao clicar em Nova Série', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    const newSerieButton = screen.getByText('Nova Série');
    await user.click(newSerieButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cadastrar');
  });

  it('deve limpar filtros quando clicar em Limpar Filtros', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieList 
          series={mockSeries}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );

    // Aplicar filtro de busca
    const searchInput = screen.getByPlaceholderText(/buscar por título/i);
    await user.type(searchInput, 'Breaking');

    // Limpar filtros
    const clearButton = screen.getByText('Limpar Filtros');
    await user.click(clearButton);

    expect(searchInput.value).toBe('');
    expect(screen.getByText('2 de 2 séries')).toBeInTheDocument();
  });
});