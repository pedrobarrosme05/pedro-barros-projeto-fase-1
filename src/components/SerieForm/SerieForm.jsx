import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const SerieForm = ({ onSubmit, editingSerie, onCancel, loading = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    numeroTemporadas: '',
    dataLancamento: null,
    diretor: '',
    produtora: '',
    categoria: '',
    dataAssistida: null
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const categorias = [
    'Drama',
    'Comédia',
    'Ação',
    'Ficção Científica',
    'Terror',
    'Romance',
    'Documentário',
    'Animação',
    'Crime',
    'Thriller'
  ];

  useEffect(() => {
    if (editingSerie) {
      setFormData({
        ...editingSerie,
        dataLancamento: editingSerie.dataLancamento ? dayjs(editingSerie.dataLancamento) : null,
        dataAssistida: editingSerie.dataAssistida ? dayjs(editingSerie.dataAssistida) : null,
      });
    }
  }, [editingSerie]);

  const validateField = (name, value) => {
    switch (name) {
      case 'titulo':
        if (!value || value.trim() === '') return 'Título é obrigatório';
        if (value.trim().length < 2) return 'Título deve ter pelo menos 2 caracteres';
        return '';
      case 'numeroTemporadas':
        if (!value || value === '') return 'Número de temporadas é obrigatório';
        if (parseInt(value) < 1) return 'Número de temporadas deve ser maior que 0';
        return '';
      case 'dataLancamento':
        if (!value) return 'Data de lançamento é obrigatória';
        return '';
      case 'diretor':
        if (!value || value.trim() === '') return 'Diretor é obrigatório';
        return '';
      case 'produtora':
        if (!value || value.trim() === '') return 'Produtora é obrigatória';
        return '';
      case 'categoria':
        if (!value || value.trim() === '') return 'Categoria é obrigatória';
        return '';
      case 'dataAssistida':
        if (!value) return 'Data em que assistiu é obrigatória';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, formData[name])
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    const serieData = {
      ...formData,
      id: editingSerie ? editingSerie.id : Date.now(),
      numeroTemporadas: parseInt(formData.numeroTemporadas),
      dataLancamento: formData.dataLancamento ? formData.dataLancamento.format('YYYY-MM-DD') : '',
      dataAssistida: formData.dataAssistida ? formData.dataAssistida.format('YYYY-MM-DD') : '',
    };

    try {
      await onSubmit(serieData);
      
      if (!editingSerie) {
        setFormData({
          titulo: '',
          numeroTemporadas: '',
          dataLancamento: null,
          diretor: '',
          produtora: '',
          categoria: '',
          dataAssistida: null
        });
        setErrors({});
        setTouched({});
      } else {
        navigate('/series');
      }
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    navigate('/series');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            {editingSerie ? 'Editar Série' : 'Cadastrar Nova Série'}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título"
                  name="titulo"
                  value={formData.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  onBlur={() => handleBlur('titulo')}
                  error={!!errors.titulo}
                  helperText={errors.titulo}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de Temporadas"
                  name="numeroTemporadas"
                  type="number"
                  value={formData.numeroTemporadas}
                  onChange={(e) => handleChange('numeroTemporadas', e.target.value)}
                  onBlur={() => handleBlur('numeroTemporadas')}
                  error={!!errors.numeroTemporadas}
                  helperText={errors.numeroTemporadas}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.categoria} required>
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={formData.categoria}
                    label="Categoria"
                    onChange={(e) => handleChange('categoria', e.target.value)}
                    onBlur={() => handleBlur('categoria')}
                  >
                    {categorias.map((categoria) => (
                      <MenuItem key={categoria} value={categoria}>
                        {categoria}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.categoria && <FormHelperText>{errors.categoria}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Diretor"
                  name="diretor"
                  value={formData.diretor}
                  onChange={(e) => handleChange('diretor', e.target.value)}
                  onBlur={() => handleBlur('diretor')}
                  error={!!errors.diretor}
                  helperText={errors.diretor}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Produtora"
                  name="produtora"
                  value={formData.produtora}
                  onChange={(e) => handleChange('produtora', e.target.value)}
                  onBlur={() => handleBlur('produtora')}
                  error={!!errors.produtora}
                  helperText={errors.produtora}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Data de Lançamento"
                  value={formData.dataLancamento}
                  onChange={(value) => handleChange('dataLancamento', value)}
                  maxDate={dayjs()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      error={!!errors.dataLancamento}
                      helperText={errors.dataLancamento}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Data em que Assistiu"
                  value={formData.dataAssistida}
                  onChange={(value) => handleChange('dataAssistida', value)}
                  maxDate={dayjs()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      error={!!errors.dataAssistida}
                      helperText={errors.dataAssistida}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    disabled={loading}
                    sx={{ minWidth: 180 }}
                  >
                    {loading ? 'Salvando...' : (editingSerie ? 'Salvar Alterações' : 'Cadastrar Série')}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outlined"
                    size="large"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SerieForm;