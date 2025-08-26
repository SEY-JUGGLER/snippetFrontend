import React, { useState, useEffect } from 'react';
import SnippetItem from './SnippetItem';
import SnippetService from '../services/SnippetService';

const SnippetsList = ({ snippets, filterCategory, onCategoryChange }) => {
  const [filteredSnippets, setFilteredSnippets] = useState([]);

  useEffect(() => {
    if (filterCategory === 'ALL') {
      setFilteredSnippets(snippets);
    } else {
      setFilteredSnippets(snippets.filter(snippet => snippet.category === filterCategory));
    }
  }, [snippets, filterCategory]);

  return (
    <div className="snippets-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Snippets de code ({filteredSnippets.length})</h2>
        <div className="btn-group">
          <button 
            className={`btn ${filterCategory === 'ALL' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onCategoryChange('ALL')}
          >
            Tous
          </button>
          <button 
            className={`btn ${filterCategory === 'HTML' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => onCategoryChange('HTML')}
          >
            HTML
          </button>
          <button 
            className={`btn ${filterCategory === 'CSS' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => onCategoryChange('CSS')}
          >
            CSS
          </button>
          <button 
            className={`btn ${filterCategory === 'PHP' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => onCategoryChange('PHP')}
          >
            PHP
          </button>
        </div>
      </div>

      {filteredSnippets.length === 0 ? (
        <div className="alert alert-info">
          Aucun snippet trouvé pour cette catégorie. Ajoutez-en un nouveau !
        </div>
      ) : (
        filteredSnippets.map(snippet => (
          <SnippetItem key={snippet.id} snippet={snippet} />
        ))
      )}
    </div>
  );
};

export default SnippetsList;