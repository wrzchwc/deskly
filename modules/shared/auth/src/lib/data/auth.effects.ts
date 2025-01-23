import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  checkAuth,
  decodeToken,
  decodeTokenSuccess,
  signOut,
  signOutSuccess
} from './auth.actions';
import { filter, map, switchMap, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { UserGroup } from '../domain/token-payload';
import { navigateToPage, Route } from '@deskly/shared/navigation';
import { AuthUrlGenerator } from './auth-url-generator.service';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly jwtService = inject(JwtService);
  private readonly authUrlGenerator = inject(AuthUrlGenerator);

  private readonly ID_TOKEN = 'id_token';
  private readonly ACCESS_TOKEN = 'access_token';

  readonly checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuth),
      map(() => new URLSearchParams(window.location.hash.substring(1))),
      filter((p) => !!p.get(this.ID_TOKEN) && !!p.get(this.ACCESS_TOKEN)),
      map((p) => ({
        identityToken: p.get(this.ID_TOKEN) as string,
        accessToken: p.get(this.ACCESS_TOKEN) as string
      })),
      map((tokens) => decodeToken(tokens))
    )
  );

  readonly decodeToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(decodeToken),
      switchMap((action) =>
        this.jwtService.decodeToken(action.identityToken).pipe(
          filter(Boolean),
          map((payload) =>
            decodeTokenSuccess({
              ...action,
              groups: (payload['cognito:groups'] || []) as UserGroup[],
              email: payload.email
            })
          )
        )
      )
    )
  );

  readonly navigateOnDecodeTokenSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(decodeTokenSuccess),
      map(() => navigateToPage({ route: Route.LANDING_PAGE }))
    )
  );

  readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      map(() => signOutSuccess())
    )
  );

  readonly signOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOutSuccess),
        tap(() => {
          // eslint-disable-next-line functional/immutable-data
          window.location.href = this.authUrlGenerator.getSignOutUrl();
        })
      ),
    { dispatch: false }
  );
}
