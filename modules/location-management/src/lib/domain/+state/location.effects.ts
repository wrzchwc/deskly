import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addLocation,
  addLocationFailure,
  addLocationSuccess,
  fetchLocations,
  setLocations,
  startAddingLocation
} from './location.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreateLocationModalComponent } from '../../ui/create-location-modal.component';
import { filter, map, switchMap, tap } from 'rxjs';
import { LocationApiClientService } from '../location-api-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LocationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly locationApiClientService: LocationApiClientService
  ) {}

  readonly startAddingLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startAddingLocation),
      map(() =>
        this.matDialog.open(CreateLocationModalComponent, {
          width: '80vw',
          maxHeight: '80vh'
        })
      ),
      switchMap((dialog) => dialog.afterClosed()),
      filter(Boolean),
      map((config) => addLocation({ config }))
    )
  );

  readonly addLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addLocation),
      switchMap(({ config }) =>
        this.locationApiClientService.createLocation(config)
      ),
      map((response) =>
        response
          ? addLocationSuccess({ location: response })
          : addLocationFailure()
      )
    )
  );

  readonly addLocationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addLocationSuccess),
        tap(() => this.matSnackBar.open('Location added successfully!', 'OK'))
      ),
    { dispatch: false }
  );

  readonly addLocationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addLocationFailure),
        tap(() => this.matSnackBar.open('Location adding failed!', 'OK'))
      ),
    { dispatch: false }
  );

  readonly fetchLocations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLocations),
      switchMap(() => this.locationApiClientService.fetchLocations()),
      filter(Boolean),
      map((locations) => setLocations({ locations }))
    )
  );
}
