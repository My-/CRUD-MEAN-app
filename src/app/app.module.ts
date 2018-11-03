import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AddRecipeImageComponent } from './add-recipe-image/add-recipe-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { AddRecipeIngredientsComponent } from './add-recipe-ingredients/add-recipe-ingredients.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    AddRecipeImageComponent,
    AddRecipeIngredientsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
