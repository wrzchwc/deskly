import { Routes } from '@angular/router';
import { Route, Title } from '@deskly/constants';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: Route.LOCATION_MANAGEMENT,
    pathMatch: 'full'
  },
  {
    path: Route.LOCATION_MANAGEMENT,
    loadComponent: async () => (await import('@deskly/location-management')).LocationManagmentPageComponent,
    title: Title.LOCATION_MANAGEMENT,
  }
];
