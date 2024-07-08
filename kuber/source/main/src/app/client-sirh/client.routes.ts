import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import {StructureOrganisationsComponent} from "./structure-organisations/structure-organisations.component";
import { CollaborateurComponent } from './collaborateur/collaborateur.component';

export const CLIENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'collaborateur',
    component: CollaborateurComponent, 
  },
  {
    path: 'organisations',
    component: StructureOrganisationsComponent,
  },
  {
    path: 'gestionnaires',
    loadChildren: () =>
      import('./administrators/administrators.routes').then((m) => m.CLIENT_ADMINISTRATORS_ROUTE),
  },

  { path: '**', component: Page404Component },

  // put your routes here
];

