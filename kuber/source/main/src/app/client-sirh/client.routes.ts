import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {StructureOrganisationsComponent} from "./structure-organisations/structure-organisations.component";
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { DetailsCollaboraterComponent } from './collaborateur/details-collaborater/details-collaborater.component';
import { SyntheseComponent } from './conge/synthese/synthese.component';
import { DetailsComponent } from './conge/details/details.component';
import { CompteurCongeComponent } from './conge/parametrage/compteur-conge/compteur-conge.component';
import { ConfigCongeComponent } from './conge/parametrage/compteur-conge/config-conge/config-conge.component';
import { CalendrierComponent } from './conge/parametrage/Referentiel/calendrier/calendrier.component';
import { JourFerierComponent } from './conge/parametrage/Referentiel/jour-ferier/jour-ferier.component';
import { AddUpdateJrFerierComponent } from './conge/parametrage/Referentiel/jour-ferier/add-update-jr-ferier/add-update-jr-ferier.component';
import { ContratComponent } from './contrat/contrat.component';


export const CLIENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  //collaborateur
  {
    path: 'collaborateur',
    component: CollaborateurComponent,
  },
  {
    path:'detailsCollaborateur',
    component:DetailsCollaboraterComponent
  },
  //conges
  {
    path: 'conge/listconge',
    component: CompteurCongeComponent,
  },
  {
    path: 'conge/parametrage',
    component: ConfigCongeComponent,
  },
  {
    path: 'conge/referentiel/calendrier',
    component: CalendrierComponent,
  },
  {
    path: 'conge/referentiel/jourferier',
    component: JourFerierComponent,
  },
  {
    path: 'conge/referentiel/jourferier/parametrage',
    component: AddUpdateJrFerierComponent,
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
    path: 'contrat',
    component: ContratComponent,
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

