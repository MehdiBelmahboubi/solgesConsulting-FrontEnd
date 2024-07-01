import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';

export const CLIENT_ADMINISTRATORS_ROUTE: Route[] = [
  
  { path: '**', component: Page404Component },
];

