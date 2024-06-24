import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';
import { Authority } from './auth.model';

const selectFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const isAuthenticated = createSelector(
  selectFeature,
  (state) => state.isAuthenticated
);

export const isManager = createSelector(selectFeature, (state) =>
  state.authorities.includes(Authority.MANAGER)
);

export const selectToken = createSelector(
  selectFeature,
  (state) => state.token
);
