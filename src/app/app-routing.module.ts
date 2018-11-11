import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {UserLoginComponent} from './components/user-login/user-login.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {AppComponent} from './app.component';
import {RecipeComponent} from './components/recipe/recipe.component';

const routes: Routes = [
    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    // Landing page
    {path: '', component: AppComponent},
    // User
    {path: 'login', component: UserLoginComponent},
    {path: 'register', component: UserRegisterComponent},
    {path: 'profile', component: UserProfileComponent},
    // Recipe
    {path: 'createRecipe', component: AddRecipeComponent},
    {path: 'recipe', component: RecipeComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
