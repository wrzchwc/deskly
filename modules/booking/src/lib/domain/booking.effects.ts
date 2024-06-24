import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { startBookingResource } from './booking.actions';
import { BookingResourceModalComponent } from '../feature/booking-resource-modal.component';
import { tap } from 'rxjs';

@Injectable()
export class BookingEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly matDialog: MatDialog
  ) {}

  readonly startBookingResource$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startBookingResource),
        tap(() =>
          this.matDialog.open(BookingResourceModalComponent, {
            width: '80vw',
            maxHeight: '80vh'
          })
        )
      ),
    { dispatch: false }
  );
}
