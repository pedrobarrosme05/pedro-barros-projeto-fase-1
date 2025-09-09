import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CssBaseline, Alert, Snackbar, Box, Chip } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'

import { ThemeProvider } from './contexts/ThemeContext'
import { useTheme } from './contexts/ThemeContext'
import NavBar from './components/NavBar/NavBar'
import SerieForm from './components/SerieForm/SerieForm'
import SerieList from './components/SerieList/SerieList'
import HomePage from './components/HomePage/HomePage'
import AboutPage from './components/AboutPage/AboutPage'
import seriesService from './services/seriesService'
import './App.css'

// Componente interno que gerencia o estado e usa o navigate
const AppRouter = () => {
  const [series, setSeries] = useState([]);
  const [editingSerie, setEditingSerie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [apiConnected, setApiConnected] = useState(false);
  const navigate = useNavigate();

  // Carregar séries da API ao inicializar
  useEffect(() => {
    loadSeries();
  }, []);

  const loadSeries = async () => {
    try {
      setLoading(true);
      
      // Testar conexão primeiro
      const isConnected = await seriesService.testConnection();
      setApiConnected(isConnected);

      if (isConnected) {
        const data = await seriesService.getAll();
        setSeries(data);
        console.log(`✅ API conectada! ${data.length} séries carregadas.`);
      } else {
        throw new Error('API não está disponível');
      }
    } catch (error) {
      console.error('Erro ao carregar séries:', error);
      setApiConnected(false);
      setError('API não está disponível. Usando dados locais.');
      
      // Fallback para dados locais se a API não estiver disponível
      setSeries([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSerie = async (serieData) => {
    try {
      setLoading(true);
      
      if (apiConnected) {
        const newSerie = await seriesService.create(serieData);
        setSeries(prev => [...prev, newSerie]);
        setSuccess('Série cadastrada com sucesso na API!');
      } else {
        // Simular criação local
        const newSerie = {
          ...serieData,
          id: Date.now()
        };
        setSeries(prev => [...prev, newSerie]);
        setSuccess('Série cadastrada localmente (API não disponível)');
      }
      
      // Navegar de volta para a lista após salvar
      navigate('/series');
    } catch (error) {
      console.error('Erro ao adicionar série:', error);
      setError('Erro ao cadastrar série: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSerie = (serie) => {
    setEditingSerie(serie);
    navigate('/cadastrar'); // Redirecionar para a página de cadastro em modo de edição
  };

  const handleUpdateSerie = async (updatedSerie) => {
    try {
      setLoading(true);
      
      if (apiConnected) {
        const result = await seriesService.update(updatedSerie);
        setSeries(prev => prev.map(serie => 
          serie.id === updatedSerie.id ? updatedSerie : serie
        ));
        setSuccess('Série atualizada com sucesso na API!');
      } else {
        // Simular atualização local
        setSeries(prev => prev.map(serie => 
          serie.id === updatedSerie.id ? updatedSerie : serie
        ));
        setSuccess('Série atualizada localmente (API não disponível)');
      }
      
      setEditingSerie(null);
      // Navegar de volta para a lista após atualizar
      navigate('/series');
    } catch (error) {
      console.error('Erro ao atualizar série:', error);
      setError('Erro ao atualizar série: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSerie = async (serieId) => {
    try {
      setLoading(true);
      
      if (apiConnected) {
        await seriesService.delete(serieId);
        setSeries(prev => prev.filter(serie => serie.id !== serieId));
        setSuccess('Série removida com sucesso da API!');
      } else {
        // Simular exclusão local
        setSeries(prev => prev.filter(serie => serie.id !== serieId));
        setSuccess('Série removida localmente (API não disponível)');
      }
    } catch (error) {
      console.error('Erro ao deletar série:', error);
      setError('Erro ao remover série: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingSerie(null);
    navigate('/series'); // Voltar para a lista ao cancelar
  };

  const handleCloseAlert = () => {
    setError('');
    setSuccess('');
  };

  const CadastroPage = () => (
    <SerieForm 
      onSubmit={editingSerie ? handleUpdateSerie : handleAddSerie}
      editingSerie={editingSerie}
      onCancel={handleCancelEdit}
      loading={loading}
    />
  );

  const ListagemPage = () => (
    <SerieList 
      series={series}
      onEdit={handleEditSerie}
      onDelete={handleDeleteSerie}
      loading={loading}
      onRefresh={loadSeries}
    />
  );

  return (
    <>
      <NavBar />
      
      {/* Indicador de Status da API */}
      <Box sx={{ p: 1, bgcolor: 'background.default', display: 'flex', justifyContent: 'center' }}>
        <Chip
          label={apiConnected ? 'API Conectada' : 'Modo Local (API Desconectada)'}
          color={apiConnected ? 'success' : 'warning'}
          size="small"
          variant="outlined"
        />
      </Box>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage series={series} />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/cadastrar" element={<CadastroPage />} />
          <Route path="/series" element={<ListagemPage />} />
        </Routes>
      </main>

      {/* Alertas de sucesso e erro */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

// Componente principal que envolve tudo com os providers
const AppContent = () => {
  const { currentTheme } = useTheme();

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <Router>
          <div className="App">
            <AppRouter />
          </div>
        </Router>
      </LocalizationProvider>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App
