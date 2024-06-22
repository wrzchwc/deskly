import { createAction, props } from '@ngrx/store';
import { Route } from './navigation.model';

const prefix = '[Shared/Navigation]';

export const navigateToPage = createAction(`${prefix} Navigate to page`, props<{ readonly route: Route }>());