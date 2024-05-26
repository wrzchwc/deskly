import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { startAddingResources } from './resources.actions';
import { map, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddResourcesModalComponent } from '../ui/add-resources-modal.component';

@Injectable()
export class ResourcesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly matDialog: MatDialog
  ) {}

  readonly startAddingResources$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startAddingResources),
        map(() =>
          this.matDialog.open(AddResourcesModalComponent, {
            width: '80vw',
            maxHeight: '80vh'
          })
        ),
        switchMap((dialogRef) => dialogRef.afterClosed())
      ),
    { dispatch: false }
  );
}
