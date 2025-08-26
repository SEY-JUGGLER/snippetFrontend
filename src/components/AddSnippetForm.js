import React, { useState } from 'react';
import SnippetService from '../services/SnippetService';

const AddSnippetForm = ({ onSnippetAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'HTML',
    code: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation simple
    if (!formData.title.trim() || !formData.description.trim() || !formData.code.trim()) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    try {
      const newSnippet = await SnippetService.addSnippet(formData);
      setSuccess('Snippet ajouté avec succès!');
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        category: 'HTML',
        code: ''
      });
      
      // Notifier le parent qu'un nouveau snippet a été ajouté
      if (onSnippetAdded) {
        onSnippetAdded(newSnippet);
      }
    } catch (error) {
      setError('Erreur lors de l\'ajout du snippet. Veuillez réessayer.');
      console.error(error);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h3>Ajouter un nouveau snippet</h3>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Titre</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titre du snippet"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brève description du code"
              rows="2"
            ></textarea>
          </div>
          
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Catégorie</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="PHP">PHP</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="code" className="form-label">Code</label>
            <textarea
              className="form-control font-monospace"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Entrez votre code ici"
              rows="8"
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary">Ajouter le snippet</button>
        </form>
      </div>
    </div>
  );
};

export default AddSnippetForm;