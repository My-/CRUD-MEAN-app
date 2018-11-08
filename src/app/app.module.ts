import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {AddRecipeImageComponent} from './components/add-recipe-image/add-recipe-image.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {AddRecipeIngredientsComponent} from './components/add-recipe-ingredients/add-recipe-ingredients.component';
import {UserLoginComponent} from './components/user-login/user-login.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
        MatInputModule,
        MatButtonModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
