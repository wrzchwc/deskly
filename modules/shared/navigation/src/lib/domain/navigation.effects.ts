import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { navigateToPage } from './navigation.actions';
import { exhaustMap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class NavigationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
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
}
