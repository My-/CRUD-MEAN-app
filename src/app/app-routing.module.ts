import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {UserLoginComponent} from './components/user-components/user-login/user-login.component';
import {UserRegisterComponent} from './components/user-components/user-register/user-register.component';
import {UserProfileComponent} from './components/user-components/user-profile/user-profile.component';
import {AddRecipeComponent} from './components/recipes-components/add-recipe/add-recipe.component';
import {AppComponent} from './app.component';
import {RecipeComponent} from './components/recipes-components/recipe/recipe.component';
import {LoginComponent} from './components/user-components/login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, {
        path: 'user',
        children: [
            {
                path: 'register',
                component: UserRegisterComponent,
            }, {
                path: 'login',
                component: UserLoginComponent,
            }, {
                path: 'profile',
                component: UserProfileComponent,
            }
        ]
    }, {
        path: 'recipe',
        children: [
            {
                path: 'createRecipe',
                component: AddRecipeComponent,
            }, {
                path: 'recipe',
                component: RecipeComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule {}
