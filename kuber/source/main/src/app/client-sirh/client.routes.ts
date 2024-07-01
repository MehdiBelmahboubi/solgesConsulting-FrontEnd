import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export const CLIENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },


  {
    path: 'gestionnaires',
    loadChildren: () =>
      import('./administrators/administrators.routes').then((m) => m.CLIENT_ADMINISTRATORS_ROUTE),
  },

  { path: '**', component: Page404Component },

  // put your routes here
];

