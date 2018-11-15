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
import {HttpClientModule} from '@angular/common/http';
import {RecipeService} from './services/recipe.service';

import {MaterialModules} from './material.modules';
import {RecipeComponent} from './components/recipe/recipe.component';
import {RecipeViewComponent} from './components/recipe-view/recipe-view.component';
import {FooterComponent} from './components/footer/footer.component';
import {SocialLoginComponent} from './components/social-login/social-login.component';


@NgModule({
    declarations: [
        AppComponent,
        AddRecipeComponent,
        AddRecipeImageComponent,
        AddRecipeIngredientsComponent,
        UserLoginComponent,
        UserRegisterComponent,
        UserProfileComponent,
        RecipeComponent,
        RecipeViewComponent,
        FooterComponent,
        SocialLoginComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModules,
    ],
    providers: [
        LoginService,
        RecipeService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
