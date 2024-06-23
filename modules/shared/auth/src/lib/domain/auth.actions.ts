import { createAction, props } from '@ngrx/store';
import { UserRole } from './auth.model';

const prefix = '[Auth]';

export const signIn = createAction(
  `${prefix} Sign in`,
  props<{ readonly email: string; readonly password: string }>()
);

export const decodeToken = createAction(
  `${prefix} Decode token`,
  props<{ readonly token: string }>()
);

export const signInSuccess = createAction(
  `${prefix} Sign in success`,
  props<{ readonly token: string; readonly role: UserRole }>()
);

export const signInFailure = createAction(`${prefix} Sign in failure`);

export const signOut = createAction(`${prefix} Sign out`);

export const signOutSuccess = createAction(`${prefix} Sign out success`);

export const signOutFailure = createAction(`${prefix} Sign out failure`);
