import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';

const routes: Routes = [
   { path: '', component: ListSuggestionComponent },
  { path: ':id', component: SuggestionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
