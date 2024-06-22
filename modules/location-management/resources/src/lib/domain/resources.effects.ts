import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addResource,
  addResourceFailure,
  addResourceSuccess,
  fetchResources,
  fetchResourcesFailure,
  fetchResourcesSuccess,
  startAddingResources
} from './resources.actions';
import { map, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddResourcesModalComponent } from '../ui/add-resources-modal.component';
import { CreateResourceConfig } from './resources.model';
import { modalResult } from '@deskly/shared/rxjs-operators';
import { ResourceApiClientService } from './resource-api-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ResourcesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly matDialog: MatDialog,
    private readonly resourceApiClientService: ResourceApiClientService,
    private readonly matSnackBar: MatSnackBar
  ) {}

  readonly startAddingResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startAddingResources),
      map(({ locationId }) =>
        this.matDialog.open<
          AddResourcesModalComponent,
          string,
          CreateResourceConfig | undefined
        >(AddResourcesModalComponent, {
          width: '80vw',
          maxHeight: '80vh',
          data: locationId
        })
      ),
      modalResult(),
      map((config) => addResource({ config }))
    )
  );

  readonly addResource = createEffect(() =>
    this.actions$.pipe(
      ofType(addResource),
      switchMap(({ config }) =>
        this.resourceApiClientService.addResource(config)
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

  readonly fetchResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchResources),
      switchMap(({ locationId }) =>
        this.resourceApiClientService
          .fetchResources(locationId)
          .pipe(
            map((response) =>
              response
                ? fetchResourcesSuccess({ resources: response, locationId })
                : fetchResourcesFailure()
            )
          )
      )
    )
  );
}
