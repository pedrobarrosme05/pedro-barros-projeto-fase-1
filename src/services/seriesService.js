import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Não foi possível conectar à API. Verifique se ela está rodando em http://localhost:3001');
    }
    if (error.response?.status === 404) {
      throw new Error('Recurso não encontrado');
    }
    if (error.response?.status >= 500) {
      throw new Error('Erro interno do servidor');
    }
    return Promise.reject(error);
  }
);

// Mapeamento de campos: Frontend ↔ API
const mapToFrontend = (apiData) => {
  if (!apiData) return null;
  
  return {
    id: apiData.id,
    titulo: apiData.title,
    numeroTemporadas: apiData.seasons,
    dataLancamento: apiData.releaseDate,
    diretor: apiData.director,
    produtora: apiData.production,
    categoria: apiData.category,
    dataAssistida: apiData.watchedAt
  };
};

const mapToAPI = (frontendData) => {
  if (!frontendData) return null;
  
  return {
    id: frontendData.id,
    title: frontendData.titulo,
    seasons: frontendData.numeroTemporadas,
    releaseDate: frontendData.dataLancamento,
    director: frontendData.diretor,
    production: frontendData.produtora,
    category: frontendData.categoria,
    watchedAt: frontendData.dataAssistida
  };
};

export const seriesService = {
  // GET: Buscar todas as séries
  getAll: async () => {
    try {
      console.log('Buscando todas as séries...');
      const response = await api.get('/series');
      console.log('Resposta da API:', response.data);
      
      // Mapear dados da API para o formato do frontend
      const mappedData = Array.isArray(response.data) 
        ? response.data.map(mapToFrontend)
        : [];
      
      console.log('Séries mapeadas:', mappedData);
      return mappedData;
    } catch (error) {
      console.error('Erro ao buscar séries:', error.message);
      throw new Error('Erro ao buscar séries: ' + error.message);
    }
  },

  // GET: Buscar série por ID
  getById: async (id) => {
    try {
      console.log(`Buscando série com ID: ${id}`);
      const response = await api.get(`/series/${id}`);
      console.log('Série encontrada:', response.data);
      return mapToFrontend(response.data);
    } catch (error) {
      console.error('Erro ao buscar série:', error.message);
      throw new Error('Erro ao buscar série: ' + error.message);
    }
  },

  // POST: Criar nova série
  create: async (serieData) => {
    try {
      console.log('Criando nova série (frontend):', serieData);
      
      // Mapear dados do frontend para o formato da API
      const apiData = mapToAPI(serieData);
      // Remover ID para criação
      const { id, ...dataToSend } = apiData;
      
      console.log('Dados enviados para API:', dataToSend);
      const response = await api.post('/series', dataToSend);
      console.log('Resposta da API:', response.data);
      
      return mapToFrontend(response.data);
    } catch (error) {
      console.error('Erro ao criar série:', error.message);
      throw new Error('Erro ao criar série: ' + error.message);
    }
  },

  // PUT: Atualizar série
  update: async (serieData) => {
    try {
      console.log('Atualizando série (frontend):', serieData);
      
      // Mapear dados do frontend para o formato da API
      const apiData = mapToAPI(serieData);
      console.log('Dados enviados para API:', apiData);
      
      // A API espera o objeto completo no corpo da requisição PUT
      const response = await api.put('/series', apiData);
      console.log('Resposta da API:', response.data);
      
      return mapToFrontend(response.data);
    } catch (error) {
      console.error('Erro ao atualizar série:', error.message);
      throw new Error('Erro ao atualizar série: ' + error.message);
    }
  },

  // DELETE: Remover série
  delete: async (id) => {
    try {
      console.log(`Deletando série com ID: ${id}`);
      const response = await api.delete(`/series/${id}`);
      console.log('Série deletada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar série:', error.message);
      throw new Error('Erro ao deletar série: ' + error.message);
    }
  },

  // Método para testar conectividade
  testConnection: async () => {
    try {
      console.log('Testando conexão com a API...');
      const response = await api.get('/series');
      console.log('✅ API conectada com sucesso! Séries encontradas:', response.data.length);
      return true;
    } catch (error) {
      console.error('❌ Falha na conexão com a API:', error.message);
      return false;
    }
  }
};

export default seriesService;