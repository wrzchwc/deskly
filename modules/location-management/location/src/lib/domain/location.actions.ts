import { createAction, props } from '@ngrx/store';
import { CreateLocationConfig } from './location.model';
import { DeleteLocationModalData } from '../ui/delete-location-modal.component';
import { Location } from '@deskly/shared/location';

const prefix = '[Location Management/Locations]';

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

export const fetchLocation = createAction(
  `${prefix} Fetch location`,
  props<{ readonly locationId: string }>()
);

export const fetchLocationSuccess = createAction(
  `${prefix} Fetch location success`,
  props<{ readonly location: Location }>()
);

export const fetchLocationFailure = createAction(
  `${prefix} Fetch location failure`
);

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
