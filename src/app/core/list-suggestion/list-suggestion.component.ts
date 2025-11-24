import { Component } from '@angular/core';
import { Suggestion } from '../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css'],
})
export class ListSuggestionComponent {
  searchText: string = '';
  searchCategory: string = '';

  favorites: Suggestion[] = [];

  suggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building...',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      likes: 0,
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Proposition pour améliorer la gestion des réservations...',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      likes: 0,
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: "Mise en place d'un programme de récompenses...",
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      likes: 0,
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description: "Refonte complète de l'UI...",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      likes: 0,
    },
    {
      id: 5,
      title: 'Formation à la sécurité informatique',
      description: 'Formation sur la sécurité informatique...',
      category: 'Formation',
      date: new Date('2025-02-05'),
      status: 'acceptee',
      likes: 0,
    },
  ];

  incrementLike(s: Suggestion) {
    s.likes!++;
  }

  addToFavorites(s: Suggestion) {
    this.favorites.push(s);
  }


  filterSuggestions(): Suggestion[] {
    return this.suggestions.filter(
      (s) =>
        s.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.searchCategory === '' || s.category === this.searchCategory)
    );
  }
}
