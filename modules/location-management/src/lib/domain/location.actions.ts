import { createAction, props } from '@ngrx/store';
import { CreateLocationConfig } from '../ui/create-location-modal.component';
import { Location } from './location.model';
import { DeleteLocationModalData } from '../ui/delete-location-modal.component';

const prefix = '[Locations]';

export const startAddingLocation = createAction(
  `${prefix} Start adding location`
);

export const addLocation = createAction(
  `${prefix} Add location`,
  props<{ readonly config: CreateLocationConfig }>()
);

export const addLocationSuccess = createAction(
  `${prefix} Add location success`,
  props<{ readonly location: Location }>()
);

export const addLocationFailure = createAction(
  `${prefix} Add location failure`
);

export const fetchLocations = createAction(`${prefix} Fetch locations`);

export const setLocations = createAction(
  `${prefix} Set locations`,
  props<{ readonly locations: Location[] }>()
);

export const startDeletingLocation = createAction(
  `${prefix} Start deleting location`,
  props<{ readonly data: DeleteLocationModalData }>()
);

export const deleteLocation = createAction(
  `${prefix} Delete location`,
  props<{ readonly id: string }>()
);

export const deleteLocationSuccess = createAction(
  `${prefix} Delete location success`,
  props<{ readonly id: string }>()
);

export const deleteLocationFailure = createAction(
  `${prefix} Delete location failure`
);
