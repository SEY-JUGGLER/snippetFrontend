import React, { useState } from 'react';

const SnippetItem = ({ snippet }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Réinitialiser après 2 secondes
      })
      .catch(err => {
        console.error('Erreur lors de la copie:', err);
      });
  };

  // Déterminer la classe de badge en fonction de la catégorie
  const getBadgeClass = (category) => {
    switch (category) {
      case 'HTML':
        return 'bg-danger';
      case 'CSS':
        return 'bg-info';
      case 'PHP':
        return 'bg-primary';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{snippet.title}</h5>
        <span className={`badge ${getBadgeClass(snippet.category)}`}>
          {snippet.category}
        </span>
      </div>
      <div className="card-body">
        <p className="card-text">{snippet.description}</p>
        <div className="code-container bg-light p-3 rounded position-relative">
          <pre className="mb-0"><code>{snippet.code}</code></pre>
          <button 
            className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 m-2"
            onClick={copyToClipboard}
          >
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetItem;