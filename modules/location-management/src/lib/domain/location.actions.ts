import { createAction, props } from '@ngrx/store';
import { CreateLocationConfig } from '../ui/create-location-modal.component';

export const startAddingLocation = createAction(
  '[Locations] Start adding location'
);

export const addLocation = createAction(
  '[Locations] Add location',
  props<{ readonly config: CreateLocationConfig }>()
);

export const addLocationSuccess = createAction(
  '[Locations] Add location success'
);

export const addLocationFailure = createAction(
  '[Locations] Add location failure'
);
