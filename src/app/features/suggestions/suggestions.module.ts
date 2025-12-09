import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionDetailComponent } from './suggestion-detail/suggestion-detail.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    SuggestionsComponent,
    SuggestionDetailComponent,
    SuggestionFormComponent
  ],
  imports: [
    CommonModule,
    SuggestionsRoutingModule,
     ReactiveFormsModule
  ],
   providers: [provideHttpClient()],  
})
export class SuggestionsModule { }
