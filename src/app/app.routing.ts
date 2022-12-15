import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
          redirectTo: '/authentication/login',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },

        ]
    },
    // {
    //     path: '',
    //     redirectTo: '/authentication/login',
    //     pathMatch: 'full'
    // },
    // {
    //     path: '',
    //     component: AppBlankComponent,
    //     children: [
    //         {
    //             path: '/authentication',
    //             loadChildren:
    //                 () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    //         }
    //     ]
    // },
    {
        path: '**',
        component: ErrorComponent,
    }

];