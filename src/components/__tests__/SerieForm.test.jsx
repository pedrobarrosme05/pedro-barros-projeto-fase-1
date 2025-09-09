import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SerieForm from '../SerieForm/SerieForm';
import { theme } from '../../theme';

const mockNavigate = vi.fn();
const mockOnSubmit = vi.fn();
const mockOnCancel = vi.fn();

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

describe('SerieForm', () => {
  const mockSerie = {
    id: 1,
    titulo: "Breaking Bad",
    numeroTemporadas: 5,
    dataLancamento: "2008-01-20",
    diretor: "Vince Gilligan",
    produtora: "Sony Pictures",
    categoria: "Drama",
    dataAssistida: "2023-06-15"
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('deve renderizar formulário de cadastro', () => {
    render(
      <TestWrapper>
        <SerieForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    );

    expect(screen.getByText('Cadastrar Nova Série')).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de temporadas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diretor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/produtora/i)).toBeInTheDocument();
  });

  it('deve renderizar formulário de edição quando editingSerie é fornecido', () => {
    render(
      <TestWrapper>
        <SerieForm 
          onSubmit={mockOnSubmit} 
          editingSerie={mockSerie}
          onCancel={mockOnCancel}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Editar Série')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Breaking Bad')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Vince Gilligan')).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    );

    const submitButton = screen.getByText('Cadastrar Série');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Título é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Número de temporadas é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Diretor é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Produtora é obrigatória')).toBeInTheDocument();
      expect(screen.getByText('Categoria é obrigatória')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('deve preencher e submeter formulário corretamente', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieForm onSubmit={mockOnSubmit} />
      </TestWrapper>
    );

    // Preencher campos
    await user.type(screen.getByLabelText(/título/i), 'Test Series');
    await user.type(screen.getByLabelText(/número de temporadas/i), '3');
    await user.type(screen.getByLabelText(/diretor/i), 'Test Director');
    await user.type(screen.getByLabelText(/produtora/i), 'Test Producer');

    // Selecionar categoria
    const categoriaSelect = screen.getByLabelText(/categoria/i);
    await user.click(categoriaSelect);
    await user.click(screen.getByText('Drama'));

    const submitButton = screen.getByText('Cadastrar Série');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          titulo: 'Test Series',
          numeroTemporadas: 3,
          diretor: 'Test Director',
          produtora: 'Test Producer',
          categoria: 'Drama'
        })
      );
    });
  });

  it('deve chamar onCancel quando cancelar', async () => {
    const user = userEvent.setup();
    
    render(
      <TestWrapper>
        <SerieForm 
          onSubmit={mockOnSubmit} 
          editingSerie={mockSerie}
          onCancel={mockOnCancel}
        />
      </TestWrapper>
    );

    const cancelButton = screen.getByText('Cancelar');
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('deve exibir estado de loading', () => {
    render(
      <TestWrapper>
        <SerieForm onSubmit={mockOnSubmit} loading={true} />
      </TestWrapper>
    );

    expect(screen.getByText('Salvando...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salvando/i })).toBeDisabled();
  });
});