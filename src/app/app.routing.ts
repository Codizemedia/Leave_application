import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { FormDataResolverService } from './resolvers/form-data-resolver.service';
import { UserDetailsResolverService } from './resolvers/user-details-resolver.service';
import { FormStatusResolverService } from './resolvers/form-status-resolver.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: '/authentication',
        pathMatch: 'full',
        // component: DashboardComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        resolve: [
            FormDataResolverService, 
            UserDetailsResolverService,
            FormStatusResolverService
        ],
        component: DashboardComponent
       
    },
    {
        path: '',
        component: FullComponent,
        resolve: [UserDetailsResolverService, FormStatusResolverService],
        children: [
            {
                canActivate: [AuthGuard],
                path: 'application-form',
                resolve: [UserDetailsResolverService],
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
