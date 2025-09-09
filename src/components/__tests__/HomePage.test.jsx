import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HomePage from '../HomePage/HomePage';
import { theme } from '../../theme';

const mockNavigate = vi.fn();

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

describe('HomePage', () => {
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
  });

  it('deve renderizar o título da aplicação', () => {
    render(
      <TestWrapper>
        <HomePage series={[]} />
      </TestWrapper>
    );

    expect(screen.getByText('SeriesManager')).toBeInTheDocument();
    expect(screen.getByText('Seu gerenciador pessoal de séries assistidas')).toBeInTheDocument();
  });

  it('deve exibir estatísticas corretas quando há séries', () => {
    render(
      <TestWrapper>
        <HomePage series={mockSeries} />
      </TestWrapper>
    );

    expect(screen.getByText('2')).toBeInTheDocument(); // Total de séries
    expect(screen.getByText('Séries Cadastradas')).toBeInTheDocument();
    expect(screen.getByText('Categorias Diferentes')).toBeInTheDocument();
  });

  it('deve navegar para cadastro quando clicar em "Cadastrar Nova Série"', () => {
    render(
      <TestWrapper>
        <HomePage series={mockSeries} />
      </TestWrapper>
    );

    const cadastrarButton = screen.getByText('Cadastrar Nova Série');
    fireEvent.click(cadastrarButton);

    expect(mockNavigate).toHaveBeenCalledWith('/cadastrar');
  });

  it('deve navegar para listagem quando clicar em "Ver Minhas Séries"', () => {
    render(
      <TestWrapper>
        <HomePage series={mockSeries} />
      </TestWrapper>
    );

    const verSeriesButton = screen.getByText('Ver Minhas Séries');
    fireEvent.click(verSeriesButton);

    expect(mockNavigate).toHaveBeenCalledWith('/series');
  });

  it('deve exibir preview das séries quando há dados', () => {
    render(
      <TestWrapper>
        <HomePage series={mockSeries} />
      </TestWrapper>
    );

    expect(screen.getByText('Séries Recentes')).toBeInTheDocument();
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.getByText('Stranger Things')).toBeInTheDocument();
  });

  it('deve renderizar sem séries', () => {
    render(
      <TestWrapper>
        <HomePage series={[]} />
      </TestWrapper>
    );

    expect(screen.getByText('0')).toBeInTheDocument(); // Zero séries
    expect(screen.queryByText('Séries Recentes')).not.toBeInTheDocument();
  });
});