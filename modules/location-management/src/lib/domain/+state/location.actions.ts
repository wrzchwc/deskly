import { createAction, props } from '@ngrx/store';
import { CreateLocationConfig } from '../../ui/create-location-modal.component';
import { Location } from '../location.model';

export const startAddingLocation = createAction(
  '[Locations] Start adding location'
);

export const addLocation = createAction(
  '[Locations] Add location',
  props<{ readonly config: CreateLocationConfig }>()
);

export const addLocationSuccess = createAction(
  '[Locations] Add location success',
  props<{ readonly location: Location }>()
);

export const addLocationFailure = createAction(
  '[Locations] Add location failure'
);

export const fetchLocations = createAction('[Locations] Fetch locations');

export const setLocations = createAction(
  '[Locations] Set locations',
  props<{ readonly locations: Location[] }>()
);
