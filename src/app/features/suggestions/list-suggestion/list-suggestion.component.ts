import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css'],
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';
  searchCategory: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data: Suggestion[]) => {
        this.suggestions = data;
        console.log('✅ Suggestions chargées:', data);
      },
      error: (err: any) => {
        console.error('❌ Erreur lors du chargement:', err);
      },
    });
  }

  incrementLike(s: Suggestion): void {
    const newLikes = (s.likes || 0) + 1;
    this.suggestionService.updateLikes(s.id, newLikes).subscribe({
      next: (updated: Suggestion) => {
        s.likes = updated.likes;
      },
      error: (err: any) => {
        console.error('❌ Erreur lors de la mise à jour des likes:', err);
      },
    });
  }

  deleteSuggestion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => this.loadSuggestions(),
        error: (err: any) => console.error(err),
      });
    }
  }

  addToFavorites(s: Suggestion): void {
    if (!this.favorites.some((f) => f.id === s.id)) {
      this.favorites.push(s);
    }
  }

  filterSuggestions(): Suggestion[] {
    return this.suggestions.filter(
      (s) =>
        s.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (this.searchCategory === '' || s.category === this.searchCategory)
    );
  }

  onAdd(): void {
    this.router.navigate(['/suggestion/add']);
  }

  goToDetails(id: number): void {
    this.router.navigate(['/suggestions', id]);
  }
}
