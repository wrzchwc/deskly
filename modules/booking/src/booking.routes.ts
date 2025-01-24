import { Routes } from '@angular/router';

export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./lib/feature/booking-page.component'))
        .BookingPageComponent
  }
];
