import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.css']
})
export class SuggestionDetailComponent implements OnInit {
  suggestion?: Suggestion;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.loadSuggestion();
  }

  loadSuggestion(): void {
    this.suggestionService.getSuggestionById(this.id).subscribe({
      next: (data) => {
        this.suggestion = data;
        console.log('✅ Détails chargés:', data);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement:', err);
        alert('Suggestion introuvable');
        this.router.navigate(['/suggestions']);
      }
    });
  }

  goToUpdate(): void {
    this.router.navigate(['/suggestions/edit', this.id]);
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }
}