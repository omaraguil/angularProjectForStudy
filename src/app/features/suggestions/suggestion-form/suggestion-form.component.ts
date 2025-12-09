import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SuggestionService } from '../../../core/services/suggestion.service';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  id?: number;
  isEditMode = false;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.isEditMode = !!this.id && !isNaN(this.id);

    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$'),
      ]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }],
    });

    if (this.isEditMode) {
      this.loadSuggestion();
    }
  }

  loadSuggestion(): void {
    if (!this.id) return;

    this.suggestionService.getSuggestionById(this.id).subscribe({
      next: (data: Suggestion) => {
        this.suggestionForm.patchValue(data);
        console.log('✅ Données chargées pour édition:', data);
      },
      error: (err: any) => {
        console.error('❌ Erreur lors du chargement:', err);
        alert('Impossible de charger la suggestion');
        this.router.navigate(['/suggestions']);
      }
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.invalid) {
      alert('Veuillez remplir tous les champs correctement');
      return;
    }

    const suggestionData: Suggestion = {
      ...this.suggestionForm.getRawValue(),
      likes: 0,
      id: this.id
    };

    if (this.isEditMode && this.id) {
      this.suggestionService.updateSuggestion(suggestionData).subscribe({
        next: (res: Suggestion) => {
          console.log('✅ Suggestion mise à jour avec succès:', res);
          alert('Suggestion mise à jour avec succès !');
          this.router.navigate(['/suggestions']);
        },
        error: (err: any) => {
          console.error('❌ Erreur lors de la mise à jour:', err);
          alert('Erreur lors de la mise à jour');
        }
      });
    } else {
      this.suggestionService.addSuggestion(suggestionData).subscribe({
        next: (res: Suggestion) => {
          console.log('✅ Suggestion ajoutée avec succès:', res);
          alert('Suggestion ajoutée avec succès !');
          this.router.navigate(['/suggestions']);
        },
        error: (err: any) => {
          console.error('❌ Erreur lors de l\'ajout:', err);
          alert('Erreur lors de l\'ajout');
        }
      });
    }
  }
}
