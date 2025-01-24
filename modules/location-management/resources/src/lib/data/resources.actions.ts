import { createAction, props } from '@ngrx/store';
import { ResourceDAO } from '../domain/resource';
import { CreateResourceRequest } from '../domain/create-resource';

const prefix = '[Location Management/Resources]';

export const startAddingResources = createAction(
  `${prefix} Start adding resources`,
  props<{ readonly locationId: string }>()
);

export const addResource = createAction(
  `${prefix} Add resource`,
  props<{ readonly request: CreateResourceRequest }>()
);

export const addResourceSuccess = createAction(
  `${prefix} Add resource success`
);

export const addResourceFailure = createAction(
  `${prefix} Add resource failure`
);

export const removeResource = createAction(
  `${prefix} Remove resource`,
  props<{ readonly locationId: string; readonly resourceId: string }>()
);

export const removeResourceSuccess = createAction(
  `${prefix} Remove resource success`,
  props<{ readonly resourceId: string }>()
);

export const removeResourceFailure = createAction(
  `${prefix} Remove resource failure`
);

export const fetchResourcesAssignedToCurrentLocation = createAction(
  `${prefix} Fetch resources assigned to location`
);

export const fetchResourcesAssignedToCurrentLocationSuccess = createAction(
  `${prefix} Fetch resources assigned to location success`,
  props<{ readonly locationId: string; readonly resources: ResourceDAO[] }>()
);
