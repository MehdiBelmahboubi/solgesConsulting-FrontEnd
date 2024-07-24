import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {StructureOrganisationsComponent} from "./structure-organisations/structure-organisations.component";
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { AddCollaboraterComponent } from './collaborateur/add-collaborater/add-collaborater.component';
import { DetailsCollaboraterComponent } from './collaborateur/details-collaborater/details-collaborater.component';
import { ParametrageComponent } from './conge/parametrage/parametrage.component';
import { SyntheseComponent } from './conge/synthese/synthese.component';
import { DetailsComponent } from './conge/details/details.component';

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
    path: 'conge/parametrage',
    component: ParametrageComponent,
  },
  {
    path: 'conge/synthese',
    component: SyntheseComponent,
  },
  {
    path: 'conge/details',
    component: DetailsComponent,
  },
  {
    path:'detailsCollaborateur',
    component:DetailsCollaboraterComponent
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

