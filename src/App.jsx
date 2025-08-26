import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import SerieForm from './components/SerieForm/SerieForm'
import SerieList from './components/SerieList/SerieList'
import './App.css'

function App() {
  const [series, setSeries] = useState([
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
  
  const [editingSerie, setEditingSerie] = useState(null);

  const handleAddSerie = (serieData) => {
    setSeries(prev => [...prev, serieData]);
  };

  const handleEditSerie = (serie) => {
    setEditingSerie(serie);
  };

  const handleUpdateSerie = (updatedSerie) => {
    setSeries(prev => prev.map(serie => 
      serie.id === updatedSerie.id ? updatedSerie : serie
    ));
    setEditingSerie(null);
  };

  const handleDeleteSerie = (serieId) => {
    if (window.confirm('Tem certeza que deseja excluir esta série?')) {
      setSeries(prev => prev.filter(serie => serie.id !== serieId));
    }
  };

  const handleCancelEdit = () => {
    setEditingSerie(null);
  };

  // Página Inicial
  const HomePage = () => (
    <div className="page-container">
      <div className="hero-section">
        <h1>Bem-vindo ao SeriesManager</h1>
        <p>Seu gerenciador pessoal de séries assistidas</p>
        <div className="hero-content">
          <div className="feature-cards">
            <div className="feature-card">
              <h3>📝 Cadastre</h3>
              <p>Adicione suas séries favoritas com todas as informações importantes</p>
            </div>
            <div className="feature-card">
              <h3>📋 Organize</h3>
              <p>Mantenha uma lista organizada de todas as séries que você assistiu</p>
            </div>
            <div className="feature-card">
              <h3>🔍 Busque</h3>
              <p>Encontre rapidamente qualquer série usando filtros e busca</p>
            </div>
          </div>
          <div className="stats">
            <div className="stat-item">
              <h3>{series.length}</h3>
              <p>Séries cadastradas</p>
            </div>
            <div className="stat-item">
              <h3>{[...new Set(series.map(s => s.categoria))].length}</h3>
              <p>Categorias diferentes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="page-container">
      <div className="about-section">
        <h1>Sobre o SeriesManager</h1>
        <div className="about-content">
          <div className="about-text">
            <h2>O que é o SeriesManager?</h2>
            <p>
              O SeriesManager é uma aplicação web desenvolvida em React que permite aos usuários 
              gerenciar suas séries assistidas de forma organizada e eficiente.
            </p>
            
            <h2>Funcionalidades</h2>
            <ul>
              <li>✅ Cadastro completo de séries com validação de formulário</li>
              <li>✅ Listagem dinâmica com busca e filtros</li>
              <li>✅ Edição e exclusão de séries</li>
              <li>✅ Interface responsiva e intuitiva</li>
              <li>✅ Navegação fluida entre páginas</li>
            </ul>

            <h2>Tecnologias Utilizadas</h2>
            <div className="tech-stack">
              <span className="tech-item">React</span>
              <span className="tech-item">React Router</span>
              <span className="tech-item">Vite</span>
              <span className="tech-item">CSS3</span>
              <span className="tech-item">JavaScript ES6+</span>
            </div>

            <h2>Desenvolvido por</h2>
            <p>Pedro Barros - Projeto Fase 1</p>
          </div>
        </div>
      </div>
    </div>
  );

  const CadastroPage = () => (
    <div className="page-container">
      <SerieForm 
        onSubmit={editingSerie ? handleUpdateSerie : handleAddSerie}
        editingSerie={editingSerie}
        onCancel={handleCancelEdit}
      />
    </div>
  );

  const ListagemPage = () => (
    <div className="page-container">
      <SerieList 
        series={series}
        onEdit={handleEditSerie}
        onDelete={handleDeleteSerie}
      />
    </div>
  );

  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/cadastrar" element={<CadastroPage />} />
            <Route path="/series" element={<ListagemPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
