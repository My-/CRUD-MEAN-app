import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {UserLoginComponent} from './components/user-login/user-login.component';
import {UserRegisterComponent} from './components/user-register/user-register.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {AddRecipeComponent} from './components/add-recipe/add-recipe.component';
import {AppComponent} from './app.component';
import {RecipeComponent} from './components/recipe/recipe.component';
import {LoginComponent} from './components/login/login.component';
import {SocialLoginComponent} from './components/social-login/social-login.component';

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
                path: 'social-login',
                component: SocialLoginComponent,
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
