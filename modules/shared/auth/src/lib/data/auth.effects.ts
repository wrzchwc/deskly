import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  decodeToken,
  signInFailure,
  signInSuccess,
  signOut,
  signOutFailure,
  signOutSuccess
} from './auth.actions';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtService } from './jwt.service';
import { navigateToPage, Route } from '@deskly/shared/navigation';
import { Authority } from '../domain/auth.model';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authApiService: AuthApiService,
    private readonly matSnackBar: MatSnackBar,
    private readonly jwtService: JwtService
  ) {}

  readonly decodeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(decodeToken),
      switchMap(({ token }) =>
        this.jwtService.decodeToken(token).pipe(
          map((payload) => {
            if (!payload) return signInFailure();
            return signInSuccess({
              token,
              authorities: payload.auth.map(({ authority }) => authority)
            });
          })
        )
      )
    )
  );

  readonly navigateOnManagerSignInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      filter(({ authorities }) => authorities.includes(Authority.MANAGER)),
      map(() => navigateToPage({ route: Route.LOCATION_MANAGEMENT }))
    )
  );

  readonly navigateOnTenantSignInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      filter(({ authorities }) => authorities.includes(Authority.TENANT)),
      map(() => navigateToPage({ route: Route.BOOKING }))
    )
  );

  readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() => this.authApiService.signOut()),
      map(() => signOutSuccess()),
      catchError(() => of(signOutFailure()))
    )
  );

  readonly navigateOnSignOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOutSuccess),
      map(() => navigateToPage({ route: Route.HOME }))
    )
  );

  readonly signOutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOutFailure),
        tap(() =>
          this.matSnackBar.open('Sign out failed! Please try again.', 'OK')
        )
      ),
    { dispatch: false }
  );
}
