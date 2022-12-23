import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { FormDataResolverService } from './resolvers/form-data-resolver.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
        // component: DashboardComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        resolve: [FormDataResolverService],
        component: DashboardComponent
       
    },
    {
        path: '',
        component: FullComponent,
        children: [
            {
                canActivate: [AuthGuard],
                path: 'application-form',
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
        path: '**',
        component: ErrorComponent,
    }
];
