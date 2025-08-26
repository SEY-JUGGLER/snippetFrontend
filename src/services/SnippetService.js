// Service pour gérer les opérations liées aux snippets de code

const API_URL = 'http://localhost/api'; // URL de l'API backend

class SnippetService {
  // Récupérer tous les snippets
  static async getAllSnippets() {
    try {
      // Vérifier si l'API est disponible, sinon utiliser localStorage
      try {
        const response = await fetch(`${API_URL}/snippets`);
        if (response.ok) {
          const result = await response.json();
          return result.data || [];
        }
      } catch (error) {
        console.warn('API non disponible, utilisation du stockage local');
      }
      
      // Fallback vers localStorage
      const snippets = localStorage.getItem('snippets');
      return snippets ? JSON.parse(snippets) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des snippets:', error);
      return [];
    }
  }

  // Récupérer les snippets par catégorie
  static async getSnippetsByCategory(category) {
    try {
      // Vérifier si l'API est disponible, sinon utiliser localStorage
      try {
        const response = await fetch(`${API_URL}/snippets?category=${category}`);
        if (response.ok) {
          const result = await response.json();
          return result.data || [];
        }
      } catch (error) {
        console.warn('API non disponible, utilisation du stockage local');
      }
      
      // Fallback vers localStorage
      const snippets = await this.getAllSnippets();
      return snippets.filter(snippet => snippet.category === category);
    } catch (error) {
      console.error(`Erreur lors de la récupération des snippets de catégorie ${category}:`, error);
      return [];
    }
  }

  // Ajouter un nouveau snippet
  static async addSnippet(snippet) {
    try {
      // Essayer d'utiliser l'API d'abord
      try {
        const response = await fetch(`${API_URL}/snippets`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(snippet),
        });
        
        if (response.ok) {
          const result = await response.json();
          return result.data;
        }
      } catch (error) {
        console.warn('API non disponible, utilisation du stockage local');
      }
      
      // Fallback vers localStorage
      const snippets = await this.getAllSnippets();
      // Générer un ID unique
      const newSnippet = {
        ...snippet,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      
      const updatedSnippets = [...snippets, newSnippet];
      localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
      
      return newSnippet;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du snippet:', error);
      throw error;
    }
  }
}

export default SnippetService;