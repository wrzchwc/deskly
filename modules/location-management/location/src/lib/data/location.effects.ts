import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addLocation,
  addLocationFailure,
  addLocationSuccess,
  deleteLocation,
  deleteLocationFailure,
  deleteLocationSuccess,
  fetchLocation,
  fetchLocationFailure,
  fetchLocations,
  fetchLocationSuccess,
  setLocations,
  startAddingLocation,
  startDeletingLocation
} from './location.actions';
import { MatDialog } from '@angular/material/dialog';
import { CreateLocationModalComponent } from '../ui/create-location-modal.component';
import { filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { LocationApiService } from './location-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DeleteLocationModalComponent,
  DeleteLocationModalData
} from '../ui/delete-location-modal.component';
import { modalResult } from '@deskly/rxjs-operators';
import { Store } from '@ngrx/store';
import { currentLocationId } from './location.selectors';
import { navigateToPage } from '@deskly/navigation';
import { Route } from '@deskly/navigation';
import { selectUrl } from '@deskly/navigation';
import {
  fetchResourcesAssignedToCurrentLocation,
  fetchResourcesAssignedToCurrentLocationSuccess
} from '@deskly/location-management/resources';

@Injectable()
export class LocationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly matDialog: MatDialog,
    private readonly matSnackBar: MatSnackBar,
    private readonly locationApiClientService: LocationApiService,
    private readonly store: Store
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
      modalResult(),
      map((request) => addLocation({ request }))
    )
  );

  readonly addLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addLocation),
      switchMap(({ request }) =>
        this.locationApiClientService.createLocation(request)
      ),
      map((response) =>
        response ? addLocationSuccess() : addLocationFailure()
      )
    )
  );

  readonly addLocationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addLocationSuccess),
        tap(() =>
          this.matSnackBar.open(
            'Location added successfully! Please refresh.',
            'OK'
          )
        )
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

  readonly fetchLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLocation),
      withLatestFrom(this.store.select(currentLocationId)),
      switchMap(([, locationId]) =>
        locationId
          ? this.locationApiClientService.fetchLocation(locationId)
          : of(undefined)
      ),
      map((response) =>
        response
          ? fetchLocationSuccess({ location: response })
          : fetchLocationFailure()
      )
    )
  );

  readonly fetchResourcesAssignedToCurrentLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchResourcesAssignedToCurrentLocation),
      withLatestFrom(this.store.select(currentLocationId)),
      map(([, locationId]) => locationId),
      filter(Boolean),
      switchMap((locationId) =>
        this.locationApiClientService
          .fetchResourcesAssignedToLocation(locationId)
          .pipe(
            filter(Boolean),
            map((resources) =>
              fetchResourcesAssignedToCurrentLocationSuccess({
                locationId,
                resources
              })
            )
          )
      )
    )
  );

  readonly startDeleteLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startDeletingLocation),
      map(({ data }) =>
        this.matDialog.open<
          DeleteLocationModalComponent,
          DeleteLocationModalData,
          string | undefined
        >(DeleteLocationModalComponent, {
          data
        })
      ),
      modalResult(),
      map((id) => deleteLocation({ id }))
    )
  );

  readonly deleteLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteLocation),
      switchMap(({ id }) =>
        this.locationApiClientService
          .deleteLocation(id)
          .pipe(map((response) => ({ response, id })))
      ),
      map(({ response, id }) =>
        response ? deleteLocationSuccess({ id }) : deleteLocationFailure()
      )
    )
  );

  readonly deleteLocationSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteLocationSuccess),
        tap(() => this.matSnackBar.open('Location removed successfully!', 'OK'))
      ),
    { dispatch: false }
  );

  readonly navigateToLocationManagementPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteLocationSuccess),
      withLatestFrom(this.store.select(selectUrl)),
      map(([, url]) => url.slice(1)),
      filter((url) => url !== Route.LOCATION_MANAGEMENT),
      map(() => navigateToPage({ route: Route.LOCATION_MANAGEMENT }))
    )
  );

  readonly deleteLocationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteLocationFailure),
        tap(() => this.matSnackBar.open('Location removal failed!', 'OK'))
      ),
    { dispatch: false }
  );
}
