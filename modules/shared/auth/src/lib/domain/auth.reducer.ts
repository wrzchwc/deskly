import { Authority } from './auth.model';
import { createReducer, on } from '@ngrx/store';
import { signInSuccess, signOutSuccess } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly authorities: Authority[];
  readonly token?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  authorities: []
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { token, authorities }) => ({
    ...state,
    token,
    authorities,
    isAuthenticated: true
  })),
  on(signOutSuccess, (state) => ({
    ...state,
    token: undefined,
    authorities: [],
    isAuthenticated: false
  }))
);
