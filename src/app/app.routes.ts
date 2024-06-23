import { Routes } from '@angular/router';
import { Route, Title } from '@deskly/shared/navigation';

export const APP_ROUTES: Routes = [
  {
    path: Route.SIGN_IN,
    title: Title.SIGN_IN,
    loadComponent: async () => (await import('@deskly/shared/auth')).SignInPageComponent
  },
  {
    path: Route.SIGN_UP,
    title: Title.SIGN_UP,
    loadComponent: async () => (await import('@deskly/shared/auth')).SignUpPageComponent
  },
  {
    path: Route.HOME,
    title: Title.HOME,
    loadComponent: async () => (await import('@deskly/shared/auth')).HomePageComponent
  },
  {
    path: Route.LOCATION_MANAGEMENT,
    title: Title.LOCATION_MANAGEMENT,
    loadChildren: async () =>
      (await import('@deskly/location-management/location')).LOCATION_ROUTES
  }
];
