import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOCATIONS_FEATURE_KEY, LocationsState } from './location.reducer';
import { adapter } from './location.reducer';
import { LocationPreview } from './location.model';
import {
  selectConferenceRooms,
  selectHotDesks
} from '@deskly/location-management/resources';

const selectFeature = createFeatureSelector<LocationsState>(
  LOCATIONS_FEATURE_KEY
);

const { selectAll, selectEntities } = adapter.getSelectors();

const selectLocations = createSelector(selectFeature, selectAll);
const selectLocationEntities = createSelector(selectFeature, selectEntities);

export const currentLocationId = createSelector(
  selectFeature,
  (state) => state.selectedLocationId
);

export const selectLocationPreviews = createSelector(
  selectLocations,
  (locations) =>
    locations.map<LocationPreview>((location) => ({
      id: location.id.id,
      name: location.name.name,
      city: location.address.city
    }))
);

export const isLoadingLocations = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const selectCurrentLocation = createSelector(
  selectLocationEntities,
  currentLocationId,
  (entities, locationId) => entities[locationId || '']
);

export const selectConferenceRoomsForCurrentLocation = createSelector(
  currentLocationId,
  selectConferenceRooms,
  (currentLocationId, conferenceRooms) =>
    conferenceRooms.filter(({ locationId }) => currentLocationId === locationId)
);

export const selectHotDesksForCurrentLocation = createSelector(
  currentLocationId,
  selectHotDesks,
  (currentLocationId, hotDesks) =>
    hotDesks.filter(({ locationId }) => locationId === currentLocationId)
);
