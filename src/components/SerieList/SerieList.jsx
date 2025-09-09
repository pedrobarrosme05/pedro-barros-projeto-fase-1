import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  InputAdornment,
  Paper,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Movie as MovieIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const SerieList = ({ series, onEdit, onDelete, loading = false, onRefresh }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, serie: null });

  const filteredSeries = series.filter(serie => {
    const matchesSearch = 
      serie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serie.diretor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      serie.produtora.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || serie.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  const categories = [...new Set(series.map(serie => serie.categoria))].sort();

  const handleDeleteClick = (serie) => {
    setDeleteDialog({ open: true, serie });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.serie) {
      onDelete(deleteDialog.serie.id);
    }
    setDeleteDialog({ open: false, serie: null });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, serie: null });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Drama': 'primary',
      'Comédia': 'secondary',
      'Ação': 'error',
      'Ficção Científica': 'info',
      'Terror': 'warning',
      'Romance': 'success',
      'Documentário': 'default',
      'Animação': 'primary',
      'Crime': 'error',
      'Thriller': 'warning'
    };
    return colors[category] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h1" component="h1">
          Minhas Séries
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/cadastrar')}
            size="large"
          >
            Nova Série
          </Button>
          <IconButton
            onClick={onRefresh}
            disabled={loading}
            color="primary"
            size="large"
          >
            {loading ? <CircularProgress size={24} /> : <RefreshIcon />}
          </IconButton>
        </Box>
      </Box>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Filtros e Busca
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Buscar séries"
              placeholder="Buscar por título, diretor ou produtora..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={filterCategory}
                label="Categoria"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">Todas as categorias</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {filteredSeries.length} de {series.length} séries
          </Typography>
          {(searchTerm || filterCategory) && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
              }}
            >
              Limpar Filtros
            </Button>
          )}
        </Box>
      </Paper>

      {/* Lista de Séries */}
      {filteredSeries.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <MovieIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            {series.length === 0 ? 'Nenhuma série cadastrada' : 'Nenhuma série encontrada'}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {series.length === 0 
              ? 'Comece cadastrando sua primeira série!'
              : 'Tente ajustar os filtros de busca.'
            }
          </Typography>
          {series.length === 0 && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/cadastrar')}
              size="large"
            >
              Cadastrar Primeira Série
            </Button>
          )}
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredSeries.map(serie => (
            <Grid item xs={12} sm={6} lg={4} key={serie.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Header do Card */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h5" component="h3" sx={{ flexGrow: 1, mr: 1 }}>
                      {serie.titulo}
                    </Typography>
                    <Chip
                      label={serie.categoria}
                      color={getCategoryColor(serie.categoria)}
                      size="small"
                    />
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Detalhes */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MovieIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        <strong>{serie.numeroTemporadas}</strong> temporada{serie.numeroTemporadas !== 1 ? 's' : ''}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {serie.diretor}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BusinessIcon fontSize="small" color="action" />
                      <Typography variant="body2" noWrap>
                        {serie.produtora}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon fontSize="small" color="action" />
                      <Typography variant="body2">
                        Lançamento: {formatDate(serie.dataLancamento)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarIcon fontSize="small" color="success.main" />
                      <Typography variant="body2">
                        Assistida: {formatDate(serie.dataAssistida)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(serie)}
                    color="primary"
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteClick(serie)}
                    color="error"
                  >
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir a série "{deleteDialog.serie?.titulo}"?
            Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SerieList;