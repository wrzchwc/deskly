import { createAction } from '@ngrx/store';

const prefix = '[Location Management/Resources]';

export const startAddingResources = createAction(
  `${prefix} Start adding resources`
);
