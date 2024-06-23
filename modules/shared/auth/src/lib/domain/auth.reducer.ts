import { UserRole } from './auth.model';
import { createReducer, on } from '@ngrx/store';
import { signInSuccess, signOutSuccess } from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly role?: UserRole;
  readonly token?: string;
}

const initialState: AuthState = {
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialState,
  on(signInSuccess, (state, { token, role }) => ({
    ...state,
    token,
    role,
    isAuthenticated: true
  })),
  on(signOutSuccess, (state) => ({
    ...state,
    token: undefined,
    role: undefined,
    isAuthenticated: false
  }))
);
