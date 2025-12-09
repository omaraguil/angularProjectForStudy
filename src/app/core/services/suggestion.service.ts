import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) { }

  // GET - Récupérer toutes les suggestions
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // GET - Récupérer une suggestion par ID
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  // POST - Ajouter une suggestion
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  // PUT - Mettre à jour une suggestion
  updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${suggestion.id}`, suggestion);
  }

  // DELETE - Supprimer une suggestion
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  // PATCH - Mettre à jour les likes
  updateLikes(id: number, likes: number): Observable<Suggestion> {
    return this.http.patch<Suggestion>(`${this.suggestionUrl}/${id}`, { likes });
  }
}