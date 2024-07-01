import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';

import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {StructureOrganisationsComponent} from "./structure-organisations/structure-organisations.component";

export const CLIENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'organisations',
    component: StructureOrganisationsComponent,
  },
  {
    path: 'managements',
    loadChildren: () =>
      import('./managements/managements.routes').then((m) => m.CLIENT_MANAGEMENTS_ROUTE),
  },
  {
    path: 'gestionnaires',
    loadChildren: () =>
      import('./administrators/administrators.routes').then((m) => m.CLIENT_ADMINISTRATORS_ROUTE),
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },

  // put your routes here
];

