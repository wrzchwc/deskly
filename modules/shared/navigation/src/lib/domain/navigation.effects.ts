import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { navigateToPage, navigateToPreviousPage } from './navigation.actions';
import { exhaustMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class NavigationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  readonly navigateToPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToPage),
        exhaustMap(({ route }) => this.router.navigate([route]))
      ),
    {
      dispatch: false
    }
  );

  readonly navigateToPreviousPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToPreviousPage),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );
}
