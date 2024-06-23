import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  decodeToken,
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signOutFailure,
  signOutSuccess,
  signUp,
  signUpFailure,
  signUpSuccess
} from './auth.actions';
import { map, switchMap, tap } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtService } from './jwt.service';
import { navigateToPage, Route } from '@deskly/shared/navigation';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authApiService: AuthApiService,
    private readonly matSnackBar: MatSnackBar,
    private readonly jwtService: JwtService
  ) {}

  readonly signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(({ email, password }) =>
        this.authApiService.signIn(email, password)
      ),
      map((response) =>
        response ? decodeToken({ token: response }) : signInFailure()
      )
    )
  );

  readonly decodeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(decodeToken),
      switchMap(({ token }) =>
        this.jwtService
          .decodeToken(token)
          .pipe(
            map((payload) =>
              payload
                ? signInSuccess({ token, role: payload.role })
                : signInFailure()
            )
          )
      )
    )
  );

  readonly navigateOnSignInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInSuccess),
      map(() => navigateToPage({ route: Route.LOCATION_MANAGEMENT }))
    )
  );

  readonly signInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInFailure),
        tap(() =>
          this.matSnackBar.open('Sign in failed! Please try again.', 'OK')
        )
      ),
    { dispatch: false }
  );

  readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(() => this.authApiService.signOut()),
      map((response) => (response ? signOutSuccess() : signOutFailure()))
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

  readonly signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      switchMap(({ request }) => this.authApiService.signUp(request)),
      map((response) => (response ? signUpSuccess() : signUpFailure()))
    )
  );

  readonly signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpSuccess),
        tap(() =>
          this.matSnackBar.open('Sign up successful! You can sign in', 'OK')
        )
      ),
    { dispatch: false }
  );

  readonly navigateOnSignUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpSuccess),
      map(() => navigateToPage({ route: Route.SIGN_IN }))
    )
  );

  readonly signUpFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signUpFailure),
        tap(() =>
          this.matSnackBar.open('Sign up failed! Please try again', 'OK')
        )
      ),
    { dispatch: false }
  );
}
