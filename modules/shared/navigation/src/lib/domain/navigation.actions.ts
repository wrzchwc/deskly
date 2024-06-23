import { createAction, props } from '@ngrx/store';
import { Route } from './navigation.model';

const prefix = '[Navigation]';

export const navigateToPage = createAction(
  `${prefix} Navigate to page`,
  props<{ readonly route: Route }>()
);

export const navigateToPreviousPage = createAction(
  `${prefix} Navigate to previous page`
);
