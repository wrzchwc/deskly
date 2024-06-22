import { createAction, props } from '@ngrx/store';
import { CreateResourceConfig, ResourceResponse } from './resources.model';

const prefix = '[Location Management/Resources]';

export const startAddingResources = createAction(
  `${prefix} Start adding resources`,
  props<{ readonly locationId: string }>()
);

export const addResource = createAction(
  `${prefix} Add resource`,
  props<{ readonly config: CreateResourceConfig }>()
);

export const addResourceSuccess = createAction(
  `${prefix} Add resource success`
);

export const addResourceFailure = createAction(
  `${prefix} Add resource failure`
);

export const fetchResources = createAction(
  `${prefix} Fetch resources`,
  props<{ readonly locationId: string }>()
);

export const fetchResourcesSuccess = createAction(
  `${prefix} Fetch resources success`,
  props<{
    readonly resources: ResourceResponse[];
    readonly locationId: string;
  }>()
);

export const fetchResourcesFailure = createAction(
  `${prefix} Fetch resources failure`
);
