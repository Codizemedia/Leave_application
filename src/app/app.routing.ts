import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'application-form',
        component: FullComponent,
        canActivate: [AuthGuard],
        children: [
           
            {
                path: '',
                loadChildren: () => import('./views/application-form/starter.module').then(m => m.StarterModule)
            },
        ]
    },
    {
        path: 'authentication',
        loadChildren:
            () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
       
    },
    {
        path: '**',
        component: ErrorComponent,
    }
];
