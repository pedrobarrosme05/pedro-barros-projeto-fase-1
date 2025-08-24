import React, { useState } from 'react';
import './SerieList.css';

const SerieList = ({ series, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredSeries = series.filter(serie => {
    const matchesSearch = serie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         serie.diretor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         serie.produtora.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || serie.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const categories = [...new Set(series.map(serie => serie.categoria))];

  return (
    <div className="serie-list-container">
      <div className="list-header">
        <h2>Lista de Séries</h2>
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar por título, diretor ou produtora..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="category-filter">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">Todas as categorias</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredSeries.length === 0 ? (
        <div className="no-series">
          <p>Nenhuma série encontrada.</p>
        </div>
      ) : (
        <div className="series-grid">
          {filteredSeries.map(serie => (
            <div key={serie.id} className="serie-card">
              <div className="serie-header">
                <h3>{serie.titulo}</h3>
                <span className="category-badge">{serie.categoria}</span>
              </div>
              
              <div className="serie-details">
                <div className="detail-item">
                  <span className="label">Temporadas:</span>
                  <span className="value">{serie.numeroTemporadas}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Lançamento:</span>
                  <span className="value">{formatDate(serie.dataLancamento)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Diretor:</span>
                  <span className="value">{serie.diretor}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Produtora:</span>
                  <span className="value">{serie.produtora}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Assistida em:</span>
                  <span className="value">{formatDate(serie.dataAssistida)}</span>
                </div>
              </div>
              
              <div className="serie-actions">
                <button
                  onClick={() => onEdit(serie)}
                  className="btn btn-edit"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(serie.id)}
                  className="btn btn-delete"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="series-count">
        <p>Total de séries: {filteredSeries.length}</p>
      </div>
    </div>
  );
};

export default SerieList;