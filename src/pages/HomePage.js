import React, { useState, useEffect } from 'react';
import AddSnippetForm from '../components/AddSnippetForm';
import SnippetsList from '../components/SnippetsList';
import SnippetService from '../services/SnippetService';

const HomePage = () => {
  const [snippets, setSnippets] = useState([]);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  // Charger les snippets au chargement de la page
  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    try {
      setLoading(true);
      const data = await SnippetService.getAllSnippets();
      setSnippets(data);
    } catch (error) {
      console.error('Erreur lors du chargement des snippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSnippetAdded = (newSnippet) => {
    setSnippets(prevSnippets => [...prevSnippets, newSnippet]);
  };

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
  };

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex align-items-center text-dark text-decoration-none">
          <span className="fs-1">Code Snippets - Gestionnaire de Snippets</span>
        </div>
      </header>

      <div className="row">
        <div className="col-md-4">
          <AddSnippetForm onSnippetAdded={handleSnippetAdded} />
        </div>
        <div className="col-md-8">
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : (
            <SnippetsList 
              snippets={snippets} 
              filterCategory={filterCategory} 
              onCategoryChange={handleCategoryChange} 
            />
          )}
        </div>
      </div>

      <footer className="pt-3 mt-4 text-muted border-top">
        &copy; 2023 Code Snippets Manager
      </footer>
    </div>
  );
};

export default HomePage;