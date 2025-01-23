import { createReducer, on } from '@ngrx/store';
import { decodeTokenSuccess, signOut } from './auth.actions';
import { UserGroup } from '../domain/token-payload';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  readonly identityToken?: string;
  readonly accessToken?: string;
  readonly userGroup?: UserGroup;
  readonly email?: string;
}

const initialState: AuthState = {};

export const authReducer = createReducer(
  initialState,
  on(decodeTokenSuccess, (state, action) => ({
    ...state,
    identityToken: action.identityToken,
    accessToken: action.accessToken,
    userGroup: action.groups.at(0),
    email: action.email
  })),
  on(signOut, (state) => ({
    ...state,
    identityToken: undefined,
    accessToken: undefined,
    userGroup: undefined,
    email: undefined
  }))
);
