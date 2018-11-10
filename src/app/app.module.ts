import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {AddRecipeImageComponent} from './components/add-recipe-image/add-recipe-image.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AddRecipeIngredientsComponent} from './components/add-recipe-ingredients/add-recipe-ingredients.component';
import {UserLoginComponent} from './components/user-login/user-login.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginService} from './services/login.service';
import {RecipeService} from './services/recipe.service';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [
        AppComponent,
        AddRecipeComponent,
        AddRecipeImageComponent,
        AddRecipeIngredientsComponent,
        UserLoginComponent,
        UserRegisterComponent,
        UserProfileComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
        MaterialModule,
    ],
    providers: [],
    providers: [LoginService, RecipeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
