import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addResource,
  addResourceFailure,
  addResourceSuccess,
  removeResource,
  removeResourceFailure,
  removeResourceSuccess,
  startAddingResources
} from './resources.actions';
import { map, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddResourcesModalComponent } from '../ui/add-resources-modal.component';
import { modalResult } from '@deskly/rxjs-operators';
import { ResourceApiService } from './resource-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateResourceRequest } from '../domain/create-resource';

@Injectable()
export class ResourcesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly matDialog: MatDialog,
    private readonly resourceApiClientService: ResourceApiService,
    private readonly matSnackBar: MatSnackBar
  ) {}

  readonly startAddingResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startAddingResources),
      map(({ locationId }) =>
        this.matDialog.open<
          AddResourcesModalComponent,
          string,
          CreateResourceRequest | undefined
        >(AddResourcesModalComponent, {
          width: '80vw',
          maxHeight: '80vh',
          data: locationId
        })
      ),
      modalResult(),
      map((request) => addResource({ request }))
    )
  );

  readonly addResource = createEffect(() =>
    this.actions$.pipe(
      ofType(addResource),
      switchMap(({ request }) =>
        this.resourceApiClientService.addResource(request)
      ),
      map((response) =>
        response ? addResourceSuccess() : addResourceFailure()
      )
    )
  );

  readonly addResourceSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addResourceSuccess),
        tap(() => this.matSnackBar.open('Resource added successfully!', 'OK'))
      ),
    { dispatch: false }
  );

  readonly addResourceFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addResourceFailure),
        tap(() => this.matSnackBar.open('Resource adding failure!', 'OK'))
      ),
    { dispatch: false }
  );

  readonly removeResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeResource),
      switchMap(({ locationId, resourceId }) =>
        this.resourceApiClientService
          .removeResource(locationId, resourceId)
          .pipe(
            map((response) =>
              response
                ? removeResourceSuccess({ resourceId })
                : removeResourceFailure()
            )
          )
      )
    )
  );

  readonly removeResourceSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeResourceSuccess),
        tap(() => this.matSnackBar.open('Resource removed successfully!', 'OK'))
      ),
    { dispatch: false }
  );

  readonly removeResourceFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeResourceFailure),
        tap(() => this.matSnackBar.open('Resource removal failure!', 'OK'))
      ),
    { dispatch: false }
  );
}
