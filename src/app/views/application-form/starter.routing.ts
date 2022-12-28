import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FormDataResolverService } from 'src/app/resolvers/form-data-resolver.service';
import { FormStatusResolverService } from 'src/app/resolvers/form-status-resolver.service';
import { UserDetailsResolverService } from 'src/app/resolvers/user-details-resolver.service';

import { ApplicationFormComponent } from './application-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const StarterRoutes: Routes = [
  {
    path: 'form',
    component: ApplicationFormComponent,
    data: {
      title: 'Leave Application Form',
      urls: [
        { title: 'Dashboard', url: 'form' },
        { title: 'Leave Application Form' }
      ]
    }
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    resolve: [
        FormDataResolverService, 
        UserDetailsResolverService,
        FormStatusResolverService
    ],
    component: DashboardComponent,
    data: {
    title: 'Dashboard',
    urls: [
      { title: 'Dashboard', url: 'dashboard' },
      // { title: 'Dashboard' }
      ]
    }
       
    },
];
