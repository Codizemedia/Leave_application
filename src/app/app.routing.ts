import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './views/application-form/dashboard/dashboard.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { FormDataResolverService } from './resolvers/form-data-resolver.service';
import { UserDetailsResolverService } from './resolvers/user-details-resolver.service';
import { FormStatusResolverService } from './resolvers/form-status-resolver.service';
import { ApplicationFormComponent } from './views/application-form/application-form.component';

export const AppRoutes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard],
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: '/authentication',
                pathMatch: 'full',
            },
           
            {
                path: 'application',
                resolve: [UserDetailsResolverService, FormStatusResolverService],
                loadChildren: () => import('./views/application-form/starter.module').then(m => m.StarterModule)
            },
            
        ],
    },
    {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
        path: '**',
        // canActivate: [AuthGuard],
        component: ErrorComponent,
    }
];
