import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AddRecipeComponent} from './components/recipes-components/add-recipe/add-recipe.component';
import {AddRecipeImageComponent} from './components/recipes-components/add-recipe-image/add-recipe-image.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AddRecipeIngredientsComponent} from './components/recipes-components/add-recipe-ingredients/add-recipe-ingredients.component';
import {UserLoginComponent} from './components/user-components/user-login/user-login.component';
import {UserRegisterComponent} from './components/user-components/user-register/user-register.component';
import {UserProfileComponent} from './components/user-components/user-profile/user-profile.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RecipeService} from './services/recipe.service';

import {MaterialModules} from './material.modules';
import {RecipeComponent} from './components/recipes-components/recipe/recipe.component';
import {RecipeViewComponent} from './components/recipes-components/recipe-view/recipe-view.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginComponent} from './components/user-components/login/login.component';
import {UserService} from './services/user.service';
import {HeaderComponent} from './components/header/header.component';
import {BodyComponent} from './components/body/body.component';
import {YummlyService} from './services/yummly.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SideNavService} from './services/side-nav.service';
import {MatBottomSheetModule} from '@angular/material';

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
        LoginComponent,
        HeaderComponent,
        BodyComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModules,
        DragDropModule,
    ],
    entryComponents: [
        LoginComponent,
    ],
    providers: [
        RecipeService,
        UserService,
        YummlyService,
        SideNavService,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule {
}
