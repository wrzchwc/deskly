import { Routes } from '@angular/router';
import { Route } from '@deskly/shared/navigation';
import { authGuard } from '@deskly/shared/auth';
import { guestGuard } from '@deskly/shared/auth';
import { BOOKING_ROUTES } from '@deskly/booking';

export const APP_ROUTES: Routes = [
  {
    path: Route.HOME,
    title: 'deskly',
    canActivate: [guestGuard],
    loadComponent: async () => (await import('@deskly/shared/auth')).HomePageComponent
  },
  {
    path: Route.LANDING_PAGE,
    title: 'deskly',
    canActivate: [authGuard],
    loadComponent: async () => (await import('@deskly/landing-page')).LandingPageComponent
  },
  {
    path: Route.LOCATION_MANAGEMENT,
    title: 'deskly | Location management',
    canMatch: [authGuard],
    loadChildren: async () =>
      (await import('@deskly/location-management/location')).LOCATION_ROUTES
  },
  {
    path: Route.BOOKING,
    title: 'deskly | Booking',
    children: BOOKING_ROUTES
  }
];
