import React, { useState, useEffect } from 'react';
import './SerieForm.css';

const SerieForm = ({ onSubmit, editingSerie, onCancel }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    numeroTemporadas: '',
    dataLancamento: '',
    diretor: '',
    produtora: '',
    categoria: '',
    dataAssistida: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (editingSerie) {
      setFormData(editingSerie);
    }
  }, [editingSerie]);

  const validateField = (name, value) => {
    switch (name) {
      case 'titulo':
        return value.trim() === '' ? 'Título é obrigatório' : '';
      case 'numeroTemporadas':
        return value === '' || parseInt(value) < 1 ? 'Número de temporadas deve ser maior que 0' : '';
      case 'dataLancamento':
        return value === '' ? 'Data de lançamento é obrigatória' : '';
      case 'diretor':
        return value.trim() === '' ? 'Diretor é obrigatório' : '';
      case 'produtora':
        return value.trim() === '' ? 'Produtora é obrigatória' : '';
      case 'categoria':
        return value.trim() === '' ? 'Categoria é obrigatória' : '';
      case 'dataAssistida':
        return value === '' ? 'Data em que assistiu é obrigatória' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = (e) => {
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
      numeroTemporadas: parseInt(formData.numeroTemporadas)
    };

    onSubmit(serieData);
    
    if (!editingSerie) {
      setFormData({
        titulo: '',
        numeroTemporadas: '',
        dataLancamento: '',
        diretor: '',
        produtora: '',
        categoria: '',
        dataAssistida: ''
      });
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="serie-form-container">
      <form onSubmit={handleSubmit} className="serie-form">
        <h2>{editingSerie ? 'Editar Série' : 'Cadastrar Nova Série'}</h2>
        
        <div className="form-group">
          <label htmlFor="titulo">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.titulo ? 'error' : ''}
            placeholder="Digite o título da série"
          />
          {errors.titulo && <span className="error-message">{errors.titulo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="numeroTemporadas">Número de Temporadas *</label>
          <input
            type="number"
            id="numeroTemporadas"
            name="numeroTemporadas"
            value={formData.numeroTemporadas}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.numeroTemporadas ? 'error' : ''}
            placeholder="Quantas temporadas"
            min="1"
          />
          {errors.numeroTemporadas && <span className="error-message">{errors.numeroTemporadas}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dataLancamento">Data de Lançamento *</label>
          <input
            type="date"
            id="dataLancamento"
            name="dataLancamento"
            value={formData.dataLancamento}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.dataLancamento ? 'error' : ''}
          />
          {errors.dataLancamento && <span className="error-message">{errors.dataLancamento}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="diretor">Diretor *</label>
          <input
            type="text"
            id="diretor"
            name="diretor"
            value={formData.diretor}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.diretor ? 'error' : ''}
            placeholder="Nome do diretor"
          />
          {errors.diretor && <span className="error-message">{errors.diretor}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="produtora">Produtora *</label>
          <input
            type="text"
            id="produtora"
            name="produtora"
            value={formData.produtora}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.produtora ? 'error' : ''}
            placeholder="Nome da produtora"
          />
          {errors.produtora && <span className="error-message">{errors.produtora}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoria *</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.categoria ? 'error' : ''}
          >
            <option value="">Selecione uma categoria</option>
            <option value="Drama">Drama</option>
            <option value="Comédia">Comédia</option>
            <option value="Ação">Ação</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Terror">Terror</option>
            <option value="Romance">Romance</option>
            <option value="Documentário">Documentário</option>
            <option value="Animação">Animação</option>
            <option value="Crime">Crime</option>
            <option value="Thriller">Thriller</option>
          </select>
          {errors.categoria && <span className="error-message">{errors.categoria}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dataAssistida">Data em que Assistiu *</label>
          <input
            type="date"
            id="dataAssistida"
            name="dataAssistida"
            value={formData.dataAssistida}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.dataAssistida ? 'error' : ''}
          />
          {errors.dataAssistida && <span className="error-message">{errors.dataAssistida}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingSerie ? 'Salvar Alterações' : 'Cadastrar Série'}
          </button>
          {editingSerie && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SerieForm;