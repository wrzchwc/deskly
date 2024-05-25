import { Routes } from '@angular/router';
import { Route, Title } from '@deskly/constants';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: Route.LOCATION_MANAGEMENT,
    pathMatch: 'full'
  },
  {
    path: Route.LOCATION_MANAGEMENT,
    title: Title.LOCATION_MANAGEMENT,
    loadChildren: async () => (await import('@deskly/location-management')).LOCATION_ROUTES,
  }
];
