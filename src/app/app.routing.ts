import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
             {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full',
            },
            {
                path: 'starter',
                loadChildren: () => import('./application-form/starter.module').then(m => m.StarterModule)
            },
        ]
    },
    {
        path: 'authentication',
        loadChildren:
            () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: '**',
        component: ErrorComponent,
    }
];
