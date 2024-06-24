import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { startBookingResource } from './booking.actions';

@Injectable()
export class BookingFacade {
  constructor(private readonly store: Store) {}

  bookResource() {
    this.store.dispatch(startBookingResource());
  }
}
