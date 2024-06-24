import { Routes } from '@angular/router';
import { Route, Title } from '@deskly/shared/navigation';
import { authGuard } from '@deskly/shared/auth';
import { guestGuard } from '@deskly/shared/auth';

export const APP_ROUTES: Routes = [
  {
    path: Route.SIGN_IN,
    title: Title.SIGN_IN,
    canActivate: [guestGuard],
    loadComponent: async () => (await import('@deskly/shared/auth')).SignInPageComponent
  },
  {
    path: Route.SIGN_UP,
    title: Title.SIGN_UP,
    canActivate: [guestGuard],
    loadComponent: async () => (await import('@deskly/shared/auth')).SignUpPageComponent
  },
  {
    path: Route.HOME,
    title: Title.HOME,
    canActivate: [guestGuard],
    loadComponent: async () => (await import('@deskly/shared/auth')).HomePageComponent
  },
  {
    path: Route.LOCATION_MANAGEMENT,
    title: Title.LOCATION_MANAGEMENT,
    canActivate: [authGuard],
    loadChildren: async () =>
      (await import('@deskly/location-management/location')).LOCATION_ROUTES
  },
  {
    path: Route.BOOKING,
    title: Title.BOOKING,
    canActivate: [authGuard],
    loadChildren: async () => (await import('@deskly/booking')).BOOKING_ROUTES
  }
];
