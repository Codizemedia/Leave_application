import { Routes } from '@angular/router';

import { ApplicationFormComponent } from './application-form.component';

export const StarterRoutes: Routes = [
  {
    path: '',
    component: ApplicationFormComponent,
	data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter Page' }
      ]
    }
  }
];
