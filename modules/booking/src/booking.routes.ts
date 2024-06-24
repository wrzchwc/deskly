import { Routes } from '@angular/router';
import { BookingFacade } from './lib/domain/booking-facade';
import { provideEffects } from '@ngrx/effects';
import { BookingEffects } from './lib/domain/booking.effects';

export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: async () =>
      (await import('./lib/feature/booking-page.component'))
        .BookingPageComponent,
    providers: [BookingFacade, provideEffects(BookingEffects)]
  }
];
