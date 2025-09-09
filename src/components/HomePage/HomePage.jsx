import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
} from '@mui/material';
import {
  MovieFilter as MovieIcon,
  List as ListIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ series = [] }) => {
  const navigate = useNavigate();

  const stats = {
    totalSeries: series.length,
    categorias: [...new Set(series.map(s => s.categoria))].length,
    recentes: series.filter(s => {
      const dataAssistida = new Date(s.dataAssistida);
      const agora = new Date();
      const diffTime = Math.abs(agora - dataAssistida);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    }).length,
  };

  const features = [
    {
      icon: <AddIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Cadastre Séries',
      description: 'Adicione suas séries favoritas com todas as informações importantes',
      action: () => navigate('/cadastrar'),
      buttonText: 'Cadastrar Nova Série'
    },
    {
      icon: <ListIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Organize sua Lista',
      description: 'Mantenha uma lista organizada de todas as séries que você assistiu',
      action: () => navigate('/series'),
      buttonText: 'Ver Minhas Séries'
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Busque e Filtre',
      description: 'Encontre rapidamente qualquer série usando filtros e busca avançada',
      action: () => navigate('/series'),
      buttonText: 'Explorar Séries'
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h1" component="h1" color="primary" gutterBottom>
          SeriesManager
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Seu gerenciador pessoal de séries assistidas
        </Typography>
        <MovieIcon sx={{ fontSize: 60, color: 'primary.main', mt: 2 }} />
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={6}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center', height: '100%' }}>
            <CardContent>
              <Typography variant="h3" color="primary.main">
                {stats.totalSeries}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Séries Cadastradas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center', height: '100%' }}>
            <CardContent>
              <Typography variant="h3" color="secondary.main">
                {stats.categorias}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Categorias Diferentes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: 'center', height: '100%' }}>
            <CardContent>
              <Typography variant="h3" color="success.main">
                {stats.recentes}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Assistidas Recentemente
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Typography variant="h2" textAlign="center" mb={4}>
        O que você pode fazer
      </Typography>
      
      <Grid container spacing={4} mb={6}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box mb={2}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={feature.action}
                  sx={{ mt: 2 }}
                >
                  {feature.buttonText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Series Preview */}
      {series.length > 0 && (
        <Box>
          <Typography variant="h2" gutterBottom>
            Séries Recentes
          </Typography>
          <Grid container spacing={2} mb={3}>
            {series.slice(0, 6).map((serie) => (
              <Grid item key={serie.id}>
                <Chip
                  label={serie.titulo}
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: '0.9rem', height: 'auto', py: 1 }}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="outlined"
            onClick={() => navigate('/series')}
            size="large"
          >
            Ver Todas as Séries
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;