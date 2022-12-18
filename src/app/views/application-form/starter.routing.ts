import { Routes } from '@angular/router';

import { ApplicationFormComponent } from './application-form.component';

export const StarterRoutes: Routes = [
  {
    path: '',
    component: ApplicationFormComponent,
    data: {
        title: 'Leave Application Form',
        urls: [
          { title: 'Dashboard', url: 'application-form' },
          { title: 'Leave Application Form' }
        ]
      }
  }
];
