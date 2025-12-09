import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

const routes: Routes = [
   { path: '', component: ListSuggestionComponent },
  { path: ':id', component: SuggestionDetailComponent }
  ,  { path: 'edit/:id', component: SuggestionFormComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
