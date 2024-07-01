import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { VideComponent } from '../vide/vide.component';

export const CLIENT_ADMINISTRATORS_ROUTE: Route[] = [
  {
    path: 'gestionnaires_1',
    component: VideComponent,
  },
  {
    path: 'gestionnaires_2',
    component: VideComponent,
  },
  { path: '**', component: Page404Component },
];

