import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOCATIONS_FEATURE_KEY, LocationsState } from './location.reducer';
import { adapter } from './location.reducer';
import { LocationPreview } from '../location.model';

const selectFeature = createFeatureSelector<LocationsState>(
  LOCATIONS_FEATURE_KEY
);

const { selectAll } = adapter.getSelectors();

const selectLocations = createSelector(selectFeature, selectAll);

export const selectLocationPreviews = createSelector(
  selectLocations,
  (locations) =>
    locations.map<LocationPreview>((location) => ({
      id: location.id,
      name: location.name,
      city: location.address.city
    }))
);

export const isLoadingLocations = createSelector(
  selectFeature,
  (state) => state.isLoading
);
