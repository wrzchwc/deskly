import { createAction, props } from '@ngrx/store';
import { UserGroup } from '../domain/token-payload';

const prefix = '[Auth]';

export const checkAuth = createAction(`${prefix} Check auth`);

export const decodeToken = createAction(
  `${prefix} Decode token`,
  props<{
    readonly identityToken: string;
    readonly accessToken: string;
  }>()
);

export const decodeTokenSuccess = createAction(
  `${prefix} Decode token success`,
  props<{
    readonly identityToken: string;
    readonly accessToken: string;
    readonly groups: UserGroup[];
  }>()
);

export const signOut = createAction(`${prefix} Sign out`);

export const signOutSuccess = createAction(`${prefix} Sign out success`);
