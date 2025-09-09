import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { seriesService } from '../seriesService';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('seriesService', () => {
  const mockApi = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockedAxios.create.mockReturnValue(mockApi);
  });

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
    }
  ];

  const mockSerie = mockSeries[0];

  describe('getAll', () => {
    it('deve retornar todas as séries', async () => {
      mockApi.get.mockResolvedValue({ data: mockSeries });

      const result = await seriesService.getAll();

      expect(mockApi.get).toHaveBeenCalledWith('/series');
      expect(result).toEqual(mockSeries);
    });

    it('deve lançar erro em caso de falha', async () => {
      const errorMessage = 'Network Error';
      mockApi.get.mockRejectedValue(new Error(errorMessage));

      await expect(seriesService.getAll()).rejects.toThrow(`Erro ao buscar séries: ${errorMessage}`);
    });
  });

  describe('getById', () => {
    it('deve retornar série por ID', async () => {
      mockApi.get.mockResolvedValue({ data: mockSerie });

      const result = await seriesService.getById(1);

      expect(mockApi.get).toHaveBeenCalledWith('/series/1');
      expect(result).toEqual(mockSerie);
    });

    it('deve lançar erro em caso de falha', async () => {
      const errorMessage = 'Not Found';
      mockApi.get.mockRejectedValue(new Error(errorMessage));

      await expect(seriesService.getById(1)).rejects.toThrow(`Erro ao buscar série: ${errorMessage}`);
    });
  });

  describe('create', () => {
    it('deve criar nova série', async () => {
      const newSerie = { ...mockSerie, id: undefined };
      mockApi.post.mockResolvedValue({ data: mockSerie });

      const result = await seriesService.create(newSerie);

      expect(mockApi.post).toHaveBeenCalledWith('/series', newSerie);
      expect(result).toEqual(mockSerie);
    });

    it('deve lançar erro em caso de falha', async () => {
      const errorMessage = 'Validation Error';
      mockApi.post.mockRejectedValue(new Error(errorMessage));

      await expect(seriesService.create(mockSerie)).rejects.toThrow(`Erro ao criar série: ${errorMessage}`);
    });
  });

  describe('update', () => {
    it('deve atualizar série existente', async () => {
      const updatedSerie = { ...mockSerie, titulo: 'Updated Title' };
      mockApi.put.mockResolvedValue({ data: updatedSerie });

      const result = await seriesService.update(updatedSerie);

      expect(mockApi.put).toHaveBeenCalledWith('/series', updatedSerie);
      expect(result).toEqual(updatedSerie);
    });

    it('deve lançar erro em caso de falha', async () => {
      const errorMessage = 'Update Error';
      mockApi.put.mockRejectedValue(new Error(errorMessage));

      await expect(seriesService.update(mockSerie)).rejects.toThrow(`Erro ao atualizar série: ${errorMessage}`);
    });
  });

  describe('delete', () => {
    it('deve deletar série por ID', async () => {
      mockApi.delete.mockResolvedValue({ data: { success: true } });

      const result = await seriesService.delete(1);

      expect(mockApi.delete).toHaveBeenCalledWith('/series/1');
      expect(result).toEqual({ success: true });
    });

    it('deve lançar erro em caso de falha', async () => {
      const errorMessage = 'Delete Error';
      mockApi.delete.mockRejectedValue(new Error(errorMessage));

      await expect(seriesService.delete(1)).rejects.toThrow(`Erro ao deletar série: ${errorMessage}`);
    });
  });
});